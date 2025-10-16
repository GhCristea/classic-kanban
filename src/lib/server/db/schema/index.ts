import { sql } from 'drizzle-orm';

export const createAccountIndexex = sql`
	DROP INDEX IF EXISTS idx_account_provider_providerAccountId;
	CREATE INDEX idx_account_provider_providerAccountId ON "account" (provider, providerAccountId);
`;

export const createVerificationTokenIndexex = sql`
	DROP INDEX IF EXISTS idx_verificationToken_identifier_token;
	CREATE INDEX idx_verificationToken_identifier_token ON "verificationToken" (identifier, token);
`;

export const createUserIndexex = sql`
	DROP INDEX IF EXISTS idx_user_email;
	DROP INDEX IF EXISTS idx_user_created_at;
    CREATE INDEX idx_user_email ON "user" (email);
    CREATE INDEX idx_user_created_at ON "user" (created_at);
`;

export const createClientIndexex = sql`
	DROP INDEX IF EXISTS idx_client_created_at;
    CREATE INDEX idx_client_created_at ON "client" (created_at);
`;

export const createProjectIndexex = sql`
	DROP INDEX IF EXISTS idx_project_client_id;
	DROP INDEX IF EXISTS idx_project_status;
	DROP INDEX IF EXISTS idx_project_created_at;
    CREATE INDEX idx_project_client_id ON project (client_id);
    CREATE INDEX idx_project_status ON project (status);
    CREATE INDEX idx_project_created_at ON project (created_at);
`;

export const createMilestoneIndexex = sql`
	DROP INDEX IF EXISTS idx_milestone_project_id;
	DROP INDEX IF EXISTS idx_milestone_status;
	DROP INDEX IF EXISTS idx_milestone_due_date;
	DROP INDEX IF EXISTS idx_milestone_created_at;
    CREATE INDEX idx_milestone_project_id ON "milestone" (project_id);
    CREATE INDEX idx_milestone_status ON "milestone" (status);
    CREATE INDEX idx_milestone_due_date ON "milestone" (due_date);
    CREATE INDEX idx_milestone_created_at ON "milestone" (created_at);
`;

export const createIssueIndexex = sql`
	DROP INDEX IF EXISTS idx_issue_project_id;
	DROP INDEX IF EXISTS idx_issue_status;
	DROP INDEX IF EXISTS idx_issue_priority;
	DROP INDEX IF EXISTS idx_issue_due_date;
	DROP INDEX IF EXISTS idx_issue_created_at;
	DROP INDEX IF EXISTS idx_issue_assigned_user_id;
    CREATE INDEX idx_issue_project_id ON "issue" (project_id);
    CREATE INDEX idx_issue_status ON "issue" (status);
    CREATE INDEX idx_issue_priority ON "issue" (priority);
    CREATE INDEX idx_issue_due_date ON "issue" (due_date);
    CREATE INDEX idx_issue_created_at ON "issue" (created_at);
    CREATE INDEX idx_issue_assigned_user_id ON "issue" (assigned_user_id);
`;

export const createCommentIndexex = sql`
	DROP INDEX IF EXISTS idx_comment_issue_id;
	DROP INDEX IF EXISTS idx_comment_user_id;
	DROP INDEX IF EXISTS idx_comment_created_at;
    CREATE INDEX idx_comment_issue_id ON "comment" (issue_id);
    CREATE INDEX idx_comment_user_id ON "comment" (user_id);
    CREATE INDEX idx_comment_created_at ON "comment" (created_at);
`;

export const createAttachmentIndexex = sql`
	DROP INDEX IF EXISTS idx_attachment_issue_id;
	DROP INDEX IF EXISTS idx_attachment_created_at;
    CREATE INDEX idx_attachment_issue_id ON "attachment" (issue_id);
    CREATE INDEX idx_attachment_created_at ON "attachment" (created_at);
`;

export const createActivityIndexex = sql`
	DROP INDEX IF EXISTS idx_activity_entity;
	DROP INDEX IF EXISTS idx_activity_user_id;
	DROP INDEX IF EXISTS idx_activity_created_at;
    CREATE INDEX idx_activity_entity ON "activity" (entity_type, entity_id);
    CREATE INDEX idx_activity_user_id ON "activity" (user_id);
    CREATE INDEX idx_activity_created_at ON "activity" (created_at);
`;

export * from './actors';
export * from './audit';
export * from './enums';
export * from './relations';
export * from './things';
