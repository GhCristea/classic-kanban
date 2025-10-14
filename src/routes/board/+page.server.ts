import { db } from '$lib/server/db';
import * as schema from '$lib/server/db/schema';
import { count, isNull } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const projects = await db.query.projectTable.findMany({
		where: isNull(schema.projectTable.deletedAt),
		with: {
			client: true
		}
	});

	const issueCounts = await db
		.select({
			projectId: schema.issueTable.projectId,
			status: schema.issueTable.status,
			count: count()
		})
		.from(schema.issueTable)
		.where(isNull(schema.issueTable.deletedAt))
		.groupBy(schema.issueTable.projectId, schema.issueTable.status);

	const countsByProject = issueCounts.reduce((acc, row) => {
		if (!acc[row.projectId]) {
			acc[row.projectId] = { Backlog: 0, Todo: 0, 'In Review': 0, Done: 0, Canceled: 0 };
		}
		acc[row.projectId][row.status] = row.count;
		return acc;
	}, {} as Record<number, Record<string, number>>);

	const projectsWithCounts = projects.map(project => ({
		...project,
		issueCounts: countsByProject[project.id] || { Backlog: 0, Todo: 0, 'In Review': 0, Done: 0, Canceled: 0 }
	}));

	return {
		projects: projectsWithCounts
	};
};
