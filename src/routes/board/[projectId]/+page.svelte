<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import Dialog from '$lib/components/Dialog.svelte';
	import KanbanColumn from '$lib/components/KanbanColumn.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';

	export let data: PageData & { form: unknown };
	let open = false;
	const form = superForm(data.form as any);
</script>

<svelte:head>
	<title>{data.project.name} - Kanban Board</title>
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
	<div class="mb-8 flex items-center justify-between">
			<div>
				<nav class="mb-2 flex items-center space-x-2 text-sm text-gray-500">
					<a href="/board" class="hover:text-gray-700">Projects</a>
					<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
					</svg>
					<span class="text-gray-900">{data.project.name}</span>
				</nav>
				<h1 class="text-3xl font-bold text-gray-900">{data.project.name}</h1>
				<p class="mt-1 text-gray-600">{data.project.client.name}</p>
			</div>
			<div class="flex items-center space-x-4">
				<button
					class="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
					on:click={() => (open = true)}
				>
					<svg class="sm:mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
					</svg>
					<span class="hidden sm:inline-block">Add Issue</span>
				</button>
				<button
					class="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
				>
					<svg class="sm:mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
						/>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
						/>
					</svg>
					<span class="hidden sm:inline-block">Settings</span>
				</button>
		</div>
	</div>

	<div class="flex space-x-6 overflow-x-auto pb-4">
		<KanbanColumn status="Backlog" issues={data.issuesByStatus.Backlog} />
		<KanbanColumn status="Todo" issues={data.issuesByStatus.Todo} />
		<KanbanColumn status="In Review" issues={data.issuesByStatus['In Review']} />
		<KanbanColumn status="Done" issues={data.issuesByStatus.Done} />
		<KanbanColumn status="Canceled" issues={data.issuesByStatus.Canceled} />
	</div>

	<Dialog {open}>
		<form
			method="POST"
			action="?/create"
			class="margin-auto backdrop-blur-xl"
			use:form.enhance={{
				onResult: async ({ result }) => {
					if (result.type === 'success') {
						open = false;
						await invalidateAll();
					}
				}
			}}
		>
			<input type="hidden" name="projectId" value={data.project.id} />
			<input name="name" placeholder="Title" required class="mt-1 w-full rounded border" />
			<textarea name="description" placeholder="Description" class="mt-2 w-full rounded border"
			></textarea>
			<div class="mt-2 grid grid-cols-2 gap-2">
				<select name="priority" class="rounded border"
					><option>Low</option><option selected>Medium</option><option>High</option></select
				>
				<input type="date" name="dueDate" class="rounded border" />
			</div>
			<div class="mt-4 flex justify-end gap-2">
				<button type="button" class="rounded border px-3 py-2" on:click={() => (open = false)}
					>Cancel</button
				>
				<button type="submit" class="rounded bg-blue-600 px-3 py-2 text-white">Create</button>
			</div>
		</form>
	</Dialog>
</div>
