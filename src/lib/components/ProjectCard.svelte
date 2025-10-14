<script lang="ts">
	import type { ProjectWithRelations } from '$lib/types';

	export let project: ProjectWithRelations;
</script>

<div class="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
	<div class="flex items-start justify-between mb-4">
		<div>
			<h3 class="text-lg font-semibold text-gray-900">{project.name}</h3>
			<p class="text-sm text-gray-600 mt-1">{project.client.name}</p>
		</div>
		<span class="text-xs text-gray-500">#{project.id}</span>
	</div>
	
	{#if project.description}
		<p class="text-sm text-gray-600 mb-4 line-clamp-2">{project.description}</p>
	{/if}
	
	<div class="flex items-center justify-between">
		<div class="flex space-x-4 text-xs text-gray-500">
			<span>Backlog: {project.issueCounts.Backlog || 0}</span>
			<span>Todo: {project.issueCounts.Todo || 0}</span>
			<span>In Review: {project.issueCounts['In Review'] || 0}</span>
			<span>Done: {project.issueCounts.Done || 0}</span>
		</div>
		<div class="text-xs text-gray-400">
			Total: {Object.values(project.issueCounts).reduce((a, b) => a + b, 0)}
		</div>
	</div>
</div>
