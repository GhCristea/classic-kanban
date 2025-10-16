import { env } from '$env/dynamic/private';
import GitHub from '@auth/core/providers/github';
import { SvelteKitAuth } from '@auth/sveltekit';
import { adapter } from './adapter';

export const { handle, signIn, signOut } = SvelteKitAuth({
	adapter,
	providers: [
		GitHub({
			clientId: env.AUTH_GITHUB_ID!,
			clientSecret: env.AUTH_GITHUB_SECRET!,
		}),
	],
	session: { strategy: 'jwt' },
	secret: env.AUTH_SECRET!,
	callbacks: {
		async jwt({ token, user }) {
		  if (user) token.id = user.id;
		  return token;
		},
		async session({ session, token }) {
		  session.user = {
			...session.user,
			id: token.id as string
		  };
		  return session;
		}
	  }
});
