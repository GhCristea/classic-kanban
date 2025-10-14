import { createInsertSchema } from 'drizzle-zod';

import * as schema from './schema';

export const insertProjectSchema = createInsertSchema(schema.projectTable);
export const insertIssueSchema = createInsertSchema(schema.issueTable);

export const updateIssueSchema = insertIssueSchema.pick({ 
	status: true, 
	priority: true,
	assignedUserId: true 
});
