import { handle as authHandle } from '$lib/server/auth';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const cookieManager: Handle = async ({ event, resolve }) => {
	const session = await event.locals.auth();

	if (session?.user?.isAnonymous && session.user.id) {
		const existingCookie = event.cookies.get('anonUserId');

		if (!existingCookie || existingCookie !== session.user.id) {
			event.cookies.set('anonUserId', session.user.id, {
				path: '/',
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'lax',
				maxAge: 60 * 60 * 24 * 7, // 7 days
			});
		}
	}

	return resolve(event);
};

const authGuard: Handle = async ({ event, resolve }) => {
	const session = await event.locals.auth();
	const publicPaths = ['/auth'];
	const isPublicPath = publicPaths.some(path => event.url.pathname.startsWith(path));

	if (!session?.user && !isPublicPath) {
		throw redirect(303, '/auth/signin');
	}

	const protectedPaths = ['/settings', '/profile'];
	const isProtectedPath = protectedPaths.some(path => event.url.pathname.startsWith(path));

	if (session?.user?.isAnonymous && isProtectedPath) {
		throw redirect(303, '/auth/upgrade');
	}

	return resolve(event);
};

export const handle = sequence(authHandle, cookieManager, authGuard);
