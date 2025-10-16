import { handle as authHandle } from '$lib/server/auth';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const authGuard: Handle = async ({ event, resolve }) => {
	const session = await event.locals.auth();
	const publicPaths = ['/auth'];
	const isPublicPath = publicPaths.some(path => event.url.pathname.startsWith(path));
	
	if (!session?.user && !isPublicPath) {
		throw redirect(303, '/auth/signin');
	}
	
	return resolve(event);
};

export const handle = sequence(authHandle, authGuard);
