import type { clientTable, issueTable, priorityEnum, projectTable, statusEnum, userTable } from "$lib/server/db/schema";

type Issue = typeof issueTable.$inferSelect;

export interface IssueWithRelations extends Issue {
    assignedUser: Pick<typeof userTable.$inferSelect, 'name' | 'id'>;
}

type Project = typeof projectTable.$inferSelect;

export interface ProjectWithRelations extends Project {
    client: Pick<typeof clientTable.$inferSelect, 'name'>;
    issueCounts: Record<string, number>;
}

export type Status = typeof statusEnum.enumValues[number];
export type Priority = typeof priorityEnum.enumValues[number];