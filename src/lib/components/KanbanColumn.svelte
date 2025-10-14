<script lang="ts">
	import type { IssueWithRelations, Status } from '$lib/types';
	import { dndzone } from 'svelte-dnd-action';
	import IssueCard from './IssueCard.svelte';
	import StatusBadge from './StatusBadge.svelte';

	export let status: Status;
	export let issues: IssueWithRelations[];
	
	const statusColors = {
		'Backlog': 'bg-gray-50 border-gray-200',
		'Todo': 'bg-blue-50 border-blue-200',
		'In Review': 'bg-purple-50 border-purple-200',
		'Done': 'bg-green-50 border-green-200',
		'Canceled': 'bg-red-50 border-red-200'
	};
	
	function handleDndConsider(e: CustomEvent) {
		issues = e.detail.items;
	}
	
	function handleDndFinalize(e: CustomEvent) {
		issues = e.detail.items;
		
		const changedItems = e.detail.items.filter((item: any, index: number) => {
			const originalItem = issues.find(original => original.id === item.id);
			return originalItem && originalItem !== item;
		});
		
		changedItems.forEach((item: any) => {
			const form = document.createElement('form');
			form.method = 'POST';
			form.action = '?/updateStatus';
			form.style.display = 'none';
			
			const issueIdInput = document.createElement('input');
			issueIdInput.name = 'issueId';
			issueIdInput.value = item.id;
			form.appendChild(issueIdInput);
			
			const statusInput = document.createElement('input');
			statusInput.name = 'status';
			statusInput.value = status;
			form.appendChild(statusInput);
			
			document.body.appendChild(form);
			form.submit();
			document.body.removeChild(form);
		});
	}
</script>

<div class="flex-1 min-w-0">
	<div class="bg-white rounded-lg border border-gray-200 h-full">
		<div class="p-4 border-b border-gray-200 {statusColors[status]}">
			<div class="flex items-center justify-between">
				<StatusBadge status={status} />
				<span class="text-sm text-gray-500">{issues.length}</span>
			</div>
		</div>
		
		<div 
			class="p-4 space-y-3 min-h-[400px]"
			use:dndzone={{ items: issues }}
			on:consider={handleDndConsider}
			on:finalize={handleDndFinalize}
		>
			{#each issues as issue (issue.id)}
				<IssueCard {issue} />
			{/each}
			
			{#if issues.length === 0}
				<div class="text-center text-gray-400 text-sm py-8">
					No issues in {status}
				</div>
			{/if}
		</div>
	</div>
</div>
