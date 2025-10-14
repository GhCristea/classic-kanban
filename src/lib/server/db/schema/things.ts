import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { getClientReferences, getUserAsigneeReferences, getUserReferences } from "./actors";
import { priorityEnum, statusEnum } from "./enums";

export const projectTable = pgTable('project', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	description: text('description'),
	status: text('status').notNull().default('active'),
	...getClientReferences(),
	deletedAt: timestamp('deleted_at'),
	createdAt:timestamp('created_at').notNull().defaultNow(),
	updatedAt:timestamp('updated_at').notNull().defaultNow(),
});

export const getProjectReferences = () => ({
	projectId: integer('project_id').references(() => projectTable.id, { onDelete: 'cascade' }).notNull()
})


export const milestoneTable = pgTable('milestone', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	description: text('description'),
	status: statusEnum('status').notNull().default('Todo'),
	dueDate: timestamp('due_date'),
	...getProjectReferences(),
	deletedAt: timestamp('deleted_at'),
	createdAt:timestamp('created_at').notNull().defaultNow(),
	updatedAt:timestamp('updated_at').notNull().defaultNow(),
});

export const issueTable = pgTable('issue', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	description: text('description'),
	status: statusEnum('status').notNull().default('Todo'),
	priority: priorityEnum('priority').notNull().default('Medium'),
	dueDate: timestamp('due_date'),
	...getProjectReferences(),
	...getUserAsigneeReferences(),
	deletedAt: timestamp('deleted_at'),
	createdAt:timestamp('created_at').notNull().defaultNow(),
	updatedAt:timestamp('updated_at').notNull().defaultNow(),
});

export const getIssueReferences = () => ({
	issueId: integer('issue_id').references(() => issueTable.id, { onDelete: 'cascade' }).notNull()
})

export const attachmentTable = pgTable('attachment', {
	id: serial('id').primaryKey(),
	url: text('url').notNull(),
	...getIssueReferences(),
	createdAt:timestamp('created_at').notNull().defaultNow(),
	updatedAt:timestamp('updated_at').notNull().defaultNow(),
});

export const commentTable = pgTable('comment', {
	id: serial('id').primaryKey(),
	content: text('content').notNull(),
	...getIssueReferences(),
	...getUserReferences(),
	createdAt:timestamp('created_at').notNull().defaultNow(),
	updatedAt:timestamp('updated_at').notNull().defaultNow(),
});
