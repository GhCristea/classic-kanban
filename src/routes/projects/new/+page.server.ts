import { db } from '$lib/server/db';
import * as schema from '$lib/server/db/schema';
import { insertProjectSchema } from '$lib/server/db/validation';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const clients = await db.query.clientTable.findMany({
		where: (clients, { isNull }) => isNull(clients.deletedAt)
	});

	return {
		clients
	};
};

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		
		try {
			const validated = insertProjectSchema.parse({
				name: data.get('name'),
				description: data.get('description'),
				clientId: parseInt(data.get('clientId') as string),
				status: data.get('status') || 'active'
			});

			await db.insert(schema.projectTable).values(validated);
			
			redirect(303, '/board');
		} catch (error) {
			console.error('Project creation failed:', error);
			return {
				error: 'Failed to create project. Please check your input.'
			};
		}
	}
};
