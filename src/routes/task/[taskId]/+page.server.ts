import { db } from '$lib/server/db';
import * as schema from '$lib/server/db/schema';
import { insertCommentSchema, updateIssueSchema } from '$lib/server/db/validation';
import { fail } from '@sveltejs/kit';
import { and, eq, isNotNull, isNull } from 'drizzle-orm';
import { zod4 as zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const taskId = parseInt(params.taskId);
	
	const issue = await db.query.issueTable.findFirst({
		where: and(
			eq(schema.issueTable.id, taskId),
			isNull(schema.issueTable.deletedAt)
		),
		with: {
			project: {
				with: {
					client: true
				}
			},
			assignedUser: true,
			comments: {
				where: isNotNull(schema.commentTable.userId),
				with: {
					user: true
				}
			},
			attachments: true
		}
	});

	if (!issue) {
		throw new Error('Task not found');
	}

	const task = {
		id: issue.id,
		name: issue.name,
		description: issue.description,
		status: issue.status,
		priority: issue.priority,
		dueDate: issue.dueDate,
		created: issue.createdAt,
		updated: issue.updatedAt,
		assignedUser: issue.assignedUser,
		project: {
			id: issue.project.id,
			name: issue.project.name,
			client: issue.project.client
		}
	};

	const comments = issue.comments.map(comment => ({
		id: comment.id,
		content: comment.content,
		user: comment.user!,
		created: comment.createdAt
	}));

	const attachments = issue.attachments.map(attachment => ({
		id: attachment.id,
		name: attachment.url.split('/').pop() || 'attachment',
		url: attachment.url,
		created: attachment.createdAt
	}));

	const users = await db.query.userTable.findMany({
		where: isNull(schema.userTable.deletedAt),
		columns: {
			id: true,
			name: true,
			email: true
		}
	});

	const updateAdapter = zod(updateIssueSchema);
	const updateForm = await superValidate({
		status: issue.status,
		priority: issue.priority,
		assignedUserId: issue.assignedUserId
	}, updateAdapter);

	const commentSchema = z.object({
		content: z.string().min(1).max(1000)
	});
	const commentAdapter = zod(commentSchema);
	const commentForm = await superValidate(commentAdapter);

	return {
		task,
		comments,
		attachments,
		users,
		updateForm,
		commentForm
	};
};

export const actions: Actions = {
	updateTask: async (event) => {
		const form = await superValidate(event, zod(updateIssueSchema));
		if (!form.valid) return fail(400, { form });
		
		const taskId = parseInt(event.params.taskId);
		await db.update(schema.issueTable)
			.set(form.data)
			.where(eq(schema.issueTable.id, taskId));
		
		return { form };
	},

	addComment: async (event) => {
		const form = await superValidate(event, zod(insertCommentSchema));
		if (!form.valid) return fail(400, { form });
		
		const taskId = parseInt(event.params.taskId);
        const userId = (await event.locals.auth())?.user?.id;
		await db.insert(schema.commentTable).values({
			...form.data,
			issueId: taskId,
			userId
		});
		
		return { form };
	}
};
