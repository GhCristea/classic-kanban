<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import type { IssueWithRelations, Status } from '$lib/types';
	import { dndzone } from 'svelte-dnd-action';
	import IssueCard from './IssueCard.svelte';
	import StatusBadge from './StatusBadge.svelte';

	export let status: Status;
	export let issues: IssueWithRelations[];

	let originalIssues: IssueWithRelations[] = [];

	const statusColors: Record<Status, string> = {
		Backlog: 'bg-gray-50 border-gray-200',
		Todo: 'bg-blue-50 border-blue-200',
		'In Review': 'bg-purple-50 border-purple-200',
		Done: 'bg-green-50 border-green-200',
		Canceled: 'bg-red-50 border-red-200'
	};

	function handleDndConsider(e: CustomEvent<{ items: IssueWithRelations[] }>) {
		if (originalIssues.length === 0) {
			originalIssues = [...issues];
		}
		issues = e.detail.items;
	}

	async function handleDndFinalize(e: CustomEvent<{ items: IssueWithRelations[] }>) {
		issues = e.detail.items;

		const changedItems = e.detail.items.filter((item) => {
			const original = originalIssues.find((o) => o.id === item.id);
			return original && original.status !== status;
		});

		for (const item of changedItems) {
			try {
				const formData = new FormData();
				formData.append('issueId', item.id.toString());
				formData.append('status', status);

				const response = await fetch('?/updateStatus', {
					method: 'POST',
					body: formData
				});

				if (response.ok) {
					await invalidateAll();
				} else {
					console.error('Failed to update issue status:', response.statusText);
				}
			} catch (error) {
				console.error('Error updating issue status:', error);
			}
		}

		originalIssues = [];
	}
</script>

<div class="min-w-52 rounded-lg border border-gray-200 bg-white">
	<div class="border-b border-gray-200 p-4 {statusColors[status]}">
		<div class="flex items-center justify-between">
			<StatusBadge {status} />
			<span class="text-sm text-gray-500">{issues.length}</span>
		</div>
	</div>

	<div
		class="min-h-[400px] space-y-3 p-4"
		use:dndzone={{ items: issues }}
		on:consider={handleDndConsider}
		on:finalize={handleDndFinalize}
	>
		{#each issues as issue (issue.id)}
			<IssueCard {issue} />
		{/each}

		{#if issues.length === 0}
			<div class="py-8 text-center text-sm text-gray-400">
				No issues in {status}
			</div>
		{/if}
	</div>
</div>
