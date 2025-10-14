import { db } from '$lib/server/db';
import * as schema from '$lib/server/db/schema';
import { and, eq, isNotNull, isNull } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

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
	
	return {
		task,
		comments,
		attachments
	};
};
