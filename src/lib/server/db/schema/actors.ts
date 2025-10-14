import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const userTable = pgTable('user', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	password: text('password').notNull(),
	deletedAt: timestamp('deleted_at'),
	createdAt:timestamp('created_at').notNull().defaultNow(),
	updatedAt:timestamp('updated_at').notNull().defaultNow(),
});

export const getUserAsigneeReferences = () => ({
	assignedUserId: integer('assigned_user_id').references(() => userTable.id, { onDelete: 'set null' })
})

export const getUserReferences = () => ({
	userId: integer('user_id').references(() => userTable.id, { onDelete: 'set null' })
})

export const clientTable = pgTable('client', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	type: text('type').notNull(),
	description: text('description'),
	deletedAt: timestamp('deleted_at'),
	createdAt:timestamp('created_at').notNull().defaultNow(),
	updatedAt:timestamp('updated_at').notNull().defaultNow(),
});

export const getClientReferences = () => (
	{   clientId: integer('client_id').references(() => clientTable.id, { onDelete: 'cascade' }).notNull() }
);