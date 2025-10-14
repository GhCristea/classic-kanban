<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	export let data: PageData;
	export let form;

	let formData = {
		name: '',
		description: '',
		clientId: '',
		status: 'active'
	};
</script>

<svelte:head>
	<title>Create New Project - Kanban Manager</title>
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
		<div class="mb-8">
			<nav class="flex items-center space-x-2 text-sm text-gray-500 mb-4">
				<a href="/board" class="hover:text-gray-700">Projects</a>
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
				</svg>
				<span class="text-gray-900">Create Project</span>
			</nav>
			
			<h1 class="text-3xl font-bold text-gray-900">Create New Project</h1>
			<p class="text-gray-600 mt-2">Set up a new project to start managing tasks and milestones</p>
		</div>
		
		<form method="POST" use:enhance class="bg-white rounded-lg border border-gray-200 p-6">
			<div class="space-y-6">
				<div>
					<label for="name" class="block text-sm font-medium text-gray-700 mb-2">
						Project Name *
					</label>
					<input
						type="text"
						id="name"
						name="name"
						required
						class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						placeholder="Enter project name"
					/>
				</div>
				
				<div>
					<label for="description" class="block text-sm font-medium text-gray-700 mb-2">
						Description
					</label>
					<textarea
						id="description"
						name="description"
						rows="4"
						class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						placeholder="Describe the project goals and requirements"
					></textarea>
				</div>
				
				<div>
					<label for="client" class="block text-sm font-medium text-gray-700 mb-2">
						Client *
					</label>
					<select
						id="client"
						name="clientId"
						required
						class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					>
						<option value="">Select a client</option>
						{#each data.clients as client}
							<option value={client.id}>{client.name} ({client.type})</option>
						{/each}
					</select>
				</div>
				
				<div>
					<label class="block text-sm font-medium text-gray-700 mb-3" for="status">
						Project Status
					</label>
					<div class="space-y-2">
						<label class="flex items-center">
							<input
								type="radio"
								name="status"
								value="active"
								checked
								class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
							/>
							<span class="ml-2 text-sm text-gray-700">Active</span>
						</label>
						<label class="flex items-center">
							<input
								type="radio"
								name="status"
								value="on-hold"
								class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
							/>
							<span class="ml-2 text-sm text-gray-700">On Hold</span>
						</label>
						<label class="flex items-center">
							<input
								type="radio"
								name="status"
								value="completed"
								class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
							/>
							<span class="ml-2 text-sm text-gray-700">Completed</span>
						</label>
					</div>
				</div>
			</div>
			
			<div class="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 mt-8">
				<a
					href="/board"
					class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
				>
					Cancel
				</a>
				<button
					type="submit"
					class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
				>
					<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
					</svg>
					Create Project
				</button>
			</div>
		</form>
		
		{#if form?.error}
			<div class="mt-6 bg-red-50 border border-red-200 rounded-md p-4">
				<div class="flex">
					<svg class="w-5 h-5 text-red-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
					</svg>
					<div class="ml-3">
						<h3 class="text-sm font-medium text-red-800">Error</h3>
						<p class="text-sm text-red-700 mt-1">
							{form.error}
						</p>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>
