import { db } from '$lib/server/db';
import * as schema from '$lib/server/db/schema';
import { updateIssueSchema } from '$lib/server/db/validation';
import { fail } from '@sveltejs/kit';
import { and, eq, isNull } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

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
	
	return {
		project,
		issuesByStatus
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
	}
};
