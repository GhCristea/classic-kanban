import { db } from '$lib/server/db';
import * as schema from '$lib/server/db/schema';
import { updateIssueSchema } from '$lib/server/db/validation';
import { fail } from '@sveltejs/kit';
import { and, eq, isNull } from 'drizzle-orm';
import { zod4 as zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';
import type { Actions, PageServerLoad } from './$types';

const createIssueSchema = z.object({
    name: z.string().min(1),
    description: z.string().max(1000).optional().nullable(),
    priority: z.enum(['Low', 'Medium', 'High']).default('Medium'),
    dueDate: z.coerce.date().optional().nullable(),
    projectId: z.coerce.number().int().positive()
});

export const load: PageServerLoad = async ({ params }) => {
	const projectId = parseInt(params.projectId);
	
    const project = await db.query.projectTable.findFirst({
		where: and(
			eq(schema.projectTable.id, projectId),
			isNull(schema.projectTable.deletedAt)
		),
		with: {
			client: true
		}
	});

	if (!project) {
		throw new Error('Project not found');
	}

	const issues = await db.query.issueTable.findMany({
		where: and(
			eq(schema.issueTable.projectId, projectId),
			isNull(schema.issueTable.deletedAt)
		),
		with: {
			assignedUser: true
		}
	});

    const issuesByStatus = {
		Backlog: issues.filter(issue => issue.status === 'Backlog'),
		Todo: issues.filter(issue => issue.status === 'Todo'),
		'In Review': issues.filter(issue => issue.status === 'In Review'),
		Done: issues.filter(issue => issue.status === 'Done'),
		Canceled: issues.filter(issue => issue.status === 'Canceled')
	};

    const adapter = zod(createIssueSchema);
    const form = await superValidate({ projectId, priority: 'Medium' }, adapter);

    return {
		project,
        issuesByStatus,
        form
	};
};

export const actions: Actions = {
	updateStatus: async ({ request }) => {
		const data = await request.formData();
		const issueId = parseInt(data.get('issueId') as string);
		const newStatus = data.get('status') as string;

		try {
			const validated = updateIssueSchema.parse({
				status: newStatus
			});

			await db.update(schema.issueTable)
				.set({ status: validated.status })
				.where(eq(schema.issueTable.id, issueId));

			return { success: true };
		} catch (error) {
			const errorCode = error instanceof Error ? error.message : 'Unknown error';
			console.error('Invalid status update', errorCode);
			return fail(400, { error: 'Invalid status update' });
		}
    },
    create: async (event) => {
        const adapter = zod(createIssueSchema);
        const form = await superValidate(event, adapter);
        if (!form.valid) return fail(400, { form });
        await db.insert(schema.issueTable).values({
            name: form.data.name,
            description: form.data.description,
            priority: form.data.priority,
            dueDate: form.data.dueDate,
            projectId: form.data.projectId,
            status: 'Todo'
        });
        return { form };
    }
};
