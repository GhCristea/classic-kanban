import { boolean, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const userTable = pgTable('user', {
	id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
	name: text('name'),
	email: text('email').unique(),
	password: text('password'),
	emailVerified: timestamp('emailVerified', { mode: 'date' }),
	image: text('image'),
	isAnonymous: boolean('isAnonymous').notNull().default(false),
	deletedAt: timestamp('deleted_at'),
	createdAt:timestamp('created_at').notNull().defaultNow(),
	updatedAt:timestamp('updated_at').notNull().defaultNow(),
});

export const accountTable = pgTable('account', {
	userId: text('userId').notNull().references(() => userTable.id, { onDelete: 'cascade' }),
	type: text('type').notNull(),
	provider: text('provider').notNull(),
	providerAccountId: text('providerAccountId').notNull(),
	refresh_token: text('refresh_token'),
	access_token: text('access_token'),
	expires_at: integer('expires_at'),
	token_type: text('token_type'),
	scope: text('scope'),
	id_token: text('id_token'),
	session_state: text('session_state'),
});

export const sessionTable = pgTable('session', {
	sessionToken: text('sessionToken').notNull().primaryKey(),
	userId: text('userId').notNull().references(() => userTable.id, { onDelete: 'cascade' }),
	expires: timestamp('expires', { mode: 'date' }).notNull(),
});

export const verificationTokenTable = pgTable('verificationToken', {
	identifier: text('identifier').notNull(),
	token: text('token').notNull(),
	expires: timestamp('expires', { mode: 'date' }).notNull(),
});

export const getUserAsigneeReferences = () => ({
	assignedUserId: text('assigned_user_id').references(() => userTable.id, { onDelete: 'set null' })
})

export const getUserReferences = () => ({
	userId: text('user_id').references(() => userTable.id, { onDelete: 'set null' })
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