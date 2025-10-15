import type { priorityEnum, statusEnum } from "$lib/server/db/schema";
import { selectIssueSchema, selectProjectSchema } from "$lib/server/db/validation";
import { z } from "zod";

export type IssueWithRelations = z.infer<typeof selectIssueSchema>;


export type  ProjectWithRelations = z.infer<typeof selectProjectSchema>;
export type Status = typeof statusEnum.enumValues[number];
export type Priority = typeof priorityEnum.enumValues[number];