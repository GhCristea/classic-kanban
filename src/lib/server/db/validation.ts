import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import * as schema from './schema';

export const insertProjectSchema = createInsertSchema(schema.projectTable);
export const insertIssueSchema = createInsertSchema(schema.issueTable);

export const selectIssueSchema = createSelectSchema(schema.issueTable).extend({
	assignedUser: createSelectSchema(schema.userTable).pick({
		name: true,
		id: true
	}).nullable()
});

export const selectProjectSchema = createSelectSchema(schema.projectTable).extend({
	client: createSelectSchema(schema.clientTable).pick({
		name: true
	})
});

export const updateIssueSchema = insertIssueSchema.pick({ 
	status: true, 
	priority: true,
	assignedUserId: true 
});

export const insertCommentSchema = createInsertSchema(schema.commentTable).pick({
	content: true
});
