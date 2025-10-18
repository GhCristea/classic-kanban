import { env } from '$env/dynamic/private';
import GitHub from '@auth/core/providers/github';
import Credentials from '@auth/core/providers/credentials';
import { SvelteKitAuth } from '@auth/sveltekit';
import { adapter } from './adapter';
import { db } from '../db';
import { userTable } from '../db/schema';
import { eq } from 'drizzle-orm';

export const { handle, signIn, signOut } = SvelteKitAuth({
	trustHost: true,
	adapter,
	providers: [
		GitHub({
			clientId: env.AUTH_GITHUB_ID!,
			clientSecret: env.AUTH_GITHUB_SECRET!,
		}),
		Credentials({
			id: 'anonymous',
			name: 'Anonymous',
			credentials: {},
			async authorize(credentials, req) {
				const cookieHeader = req.headers.get('cookie');
				const cookies = Object.fromEntries(
					cookieHeader
						?.split(';')
						.map(c => c.trim().split('='))
						.map(([key, value]) => [key, decodeURIComponent(value)])
					?? []
				);

				const existingAnonId = cookies.anonUserId;

				if (existingAnonId) {
					const existingUser = await db
						.select()
						.from(userTable)
						.where(eq(userTable.id, existingAnonId))
						.limit(1);

					if (existingUser.length > 0 && existingUser[0].isAnonymous) {
						return {
							id: existingUser[0].id,
							name: existingUser[0].name || 'Guest',
							email: existingUser[0].email,
							isAnonymous: true,
						};
					}
				}

				const userId = crypto.randomUUID();
				const anonymousUser = {
					id: userId,
					name: 'Guest',
					email: null,
					isAnonymous: true,
					createdAt: new Date(),
					updatedAt: new Date(),
				};

				await db.insert(userTable).values(anonymousUser);

				return {
					id: userId,
					name: 'Guest',
					email: null,
					isAnonymous: true,
				};
			}
		})
	],
	secret: env.AUTH_SECRET!,
	callbacks: {
		async jwt({ token, user }) {
		  if (user) {
			token.id = user.id;
			token.isAnonymous = user.isAnonymous ?? false;
		  }
		  return token;
		},
		async session({ session, token }) {
		  session.user = {
			...session.user,
			id: token.id as string,
			isAnonymous: (token.isAnonymous as boolean) ?? false,
		  };
		  return session;
		}
	  }
});
