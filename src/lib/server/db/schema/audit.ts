import { integer, jsonb, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { getUserReferences } from "./actors";

export const auditTable = pgTable('audit', {
	id: serial('id').primaryKey(),
	entityType: text('entity_type').notNull(),
	entityId: integer('entity_id').notNull(),
	...getUserReferences(),
	action: text('action').notNull(),
	details: jsonb('details'),
	createdAt:timestamp('created_at').notNull().defaultNow(),
	updatedAt:timestamp('updated_at').notNull().defaultNow(),
});