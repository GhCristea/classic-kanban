<script lang="ts">
	import { goto } from '$app/navigation';
	import type { IssueWithRelations } from '$lib/types';
	import PriorityBadge from './PriorityBadge.svelte';
	

	export let issue: IssueWithRelations;
	
	function formatDate(date: Date): string {
		return new Intl.DateTimeFormat('en-GB', { 
			month: 'short', 
			day: 'numeric' 
		}).format(date);
	}
	
	function isOverdue(date: Date): boolean {
		return date < new Date();
	}
	
	function handleClick() {
		goto(`/task/${issue.id}`);
	}
</script>

<div class="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer" on:click={handleClick} on:keydown={(e) => e.key === 'Enter' && handleClick()} role="button" tabindex="0">
	<div class="flex items-start justify-between mb-3">
		<h4 class="text-sm font-medium text-gray-900 line-clamp-2">{issue.name}</h4>
		<span class="text-xs text-gray-500">#{issue.id}</span>
	</div>
	
	{#if issue.description}
		<p class="text-xs text-gray-600 mb-3 line-clamp-2">{issue.description}</p>
	{/if}
	
	<div class="flex items-center justify-between mb-3">
		<PriorityBadge priority={issue.priority} />
		{#if issue.dueDate}
			<span class="text-xs {isOverdue(issue.dueDate) ? 'text-red-600 font-medium' : 'text-gray-500'}">
				{formatDate(issue.dueDate)}
			</span>
		{/if}
	</div>
	
	{#if issue.assignedUser}
		<div class="flex items-center space-x-2">
			<div class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
				{issue.assignedUser.name.charAt(0).toUpperCase()}
			</div>
			<span class="text-xs text-gray-600">{issue.assignedUser.name}</span>
		</div>
	{/if}
</div>
