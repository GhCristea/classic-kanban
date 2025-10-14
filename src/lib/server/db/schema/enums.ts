import { pgEnum } from "drizzle-orm/pg-core";

export const statusEnum = pgEnum('status', ['Backlog', 'Todo', 'In Review', 'Done', 'Canceled']);
export const priorityEnum = pgEnum('priority', ['Low', 'Medium', 'High']);