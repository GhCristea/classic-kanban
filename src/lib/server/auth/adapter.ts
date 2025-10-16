import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '../db';
import * as schema from '../db/schema';

export const adapter = DrizzleAdapter(db, {
	usersTable: schema.userTable,
	accountsTable: schema.accountTable,
	sessionsTable: schema.sessionTable,
	verificationTokensTable: schema.verificationTokenTable,
});
