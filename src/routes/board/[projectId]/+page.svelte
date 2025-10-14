<script lang="ts">
	import KanbanColumn from '$lib/components/KanbanColumn.svelte';
	import type { PageData } from './$types';
	
	export let data: PageData;
</script>

<svelte:head>
	<title>{data.project.name} - Kanban Board</title>
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
		<div class="mb-8">
			<div class="flex items-center justify-between">
				<div>
					<nav class="flex items-center space-x-2 text-sm text-gray-500 mb-2">
						<a href="/board" class="hover:text-gray-700">Projects</a>
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
						</svg>
						<span class="text-gray-900">{data.project.name}</span>
					</nav>
					<h1 class="text-3xl font-bold text-gray-900">{data.project.name}</h1>
					<p class="text-gray-600 mt-1">{data.project.client.name}</p>
				</div>
				<div class="flex items-center space-x-4">
					<button class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
						<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
						</svg>
						Add Issue
					</button>
					<button class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
						<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
						</svg>
						Settings
					</button>
				</div>
			</div>
		</div>
		
		<div class="flex space-x-6 overflow-x-auto pb-4">
			<KanbanColumn status="Backlog" issues={data.issuesByStatus.Backlog} />
			<KanbanColumn status="Todo" issues={data.issuesByStatus.Todo} />
			<KanbanColumn status="In Review" issues={data.issuesByStatus['In Review']} />
			<KanbanColumn status="Done" issues={data.issuesByStatus.Done} />
			<KanbanColumn status="Canceled" issues={data.issuesByStatus.Canceled} />
		</div>
	</div>
</div>
