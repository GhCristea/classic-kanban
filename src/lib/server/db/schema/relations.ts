import { relations } from "drizzle-orm";
import { clientTable, userTable } from "./actors";
import { auditTable } from "./audit";
import { attachmentTable, commentTable, issueTable, milestoneTable, projectTable } from "./things";

export const issueRelations = relations(issueTable, ({ one, many }) => ({
	project: one(projectTable, {
		fields: [issueTable.projectId],
		references: [projectTable.id]
	}),
	assignedUser: one(userTable, {
		fields: [issueTable.assignedUserId],
		references: [userTable.id]
	}),
	comments: many(commentTable),
	attachments: many(attachmentTable)
}));

export const projectRelations = relations(projectTable, ({ one, many }) => ({
	client: one(clientTable, {
		fields: [projectTable.clientId],
		references: [clientTable.id]
	}),
	issues: many(issueTable),
}));


export const commentRelations = relations(commentTable, ({ one }) => ({
	issue: one(issueTable, {
		fields: [commentTable.issueId],
		references: [issueTable.id]
	}),
	user: one(userTable, {
		fields: [commentTable.userId],
		references: [userTable.id]
	})
}));

export const attachmentRelations = relations(attachmentTable, ({ one }) => ({
	issue: one(issueTable, {
		fields: [attachmentTable.issueId],
		references: [issueTable.id]
	})
}));

export const milestoneRelations = relations(milestoneTable, ({ one }) => ({
	project: one(projectTable, {
		fields: [milestoneTable.projectId],
		references: [projectTable.id]
	})
}));

export const activityRelations = relations(auditTable, ({ one }) => ({
	user: one(userTable, {
		fields: [auditTable.userId],
		references: [userTable.id]
	})
}));
