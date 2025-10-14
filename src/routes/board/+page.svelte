<script lang="ts">
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import type { PageData } from './$types';
	
	export let data: PageData;
</script>

<svelte:head>
	<title>Project Board - Kanban Manager</title>
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
		<div class="mb-8">
			<h1 class="text-3xl font-bold text-gray-900">Project Board</h1>
			<p class="text-gray-600 mt-2">Select a project to view its Kanban board</p>
		</div>
		
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each data.projects as project}
				{#if project.description}
				<a href="/board/{project.id}" class="block">
					<ProjectCard {project} />
				</a>
				{/if}
			{/each}
		</div>
		
		<div class="mt-8 text-center">
			<a 
				href="/projects/new" 
				class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
			>
				<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
				</svg>
				Create New Project
			</a>
		</div>
	</div>
</div>
