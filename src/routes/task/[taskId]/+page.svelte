<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import PriorityBadge from '$lib/components/PriorityBadge.svelte';
	import StatusBadge from '$lib/components/StatusBadge.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';

	export let data: PageData;
	let taskId = data.task.id;
	let editMode = false;

	const { form: updateForm, errors: updateErrors } = superForm(data.updateForm, {
		resetForm: false,
		invalidateAll: true
	});

	const { form: commentFormData, errors: commentErrors } = superForm(data.commentForm, {
		resetForm: true,
		invalidateAll: true
	});

	async function handleFieldUpdate() {
		if (!editMode) return;
		
		try {
			const formData = new FormData();
			formData.append('status', $updateForm.status || '');
			formData.append('priority', $updateForm.priority || '');
			formData.append('assignedUserId', $updateForm.assignedUserId?.toString() || '');

			const response = await fetch('?/updateTask', {
				method: 'POST',
				body: formData
			});

			if (response.ok) {
				await invalidateAll();
			} else {
				console.error('Failed to update task');
			}
		} catch (error) {
			console.error('Error updating task:', error);
		}
	}

	function formatDate(date: Date): string {
		return new Intl.DateTimeFormat('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		}).format(date);
	}

	function formatDateShort(date: Date): string {
		return new Intl.DateTimeFormat('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric'
		}).format(date);
	}
</script>

<svelte:head>
	<title>{data.task.name} - Task Details</title>
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<div class="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
		<div class="mb-8">
			<nav class="mb-4 flex items-center space-x-2 text-sm text-gray-500">
				<a href="/board" class="hover:text-gray-700">Projects</a>
				<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"
					></path>
				</svg>
				<a href="/board/{data.task.project.id}" class="hover:text-gray-700"
					>{data.task.project.name}</a
				>
				<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"
					></path>
				</svg>
				<span class="text-gray-900">Task #{data.task.id}</span>
			</nav>

			<div class="flex items-start justify-between">
				<div class="flex-1">
					<h1 class="mb-4 text-3xl font-bold text-gray-900">{data.task.name}</h1>
					<div class="mb-6 flex items-center space-x-4">
						{#if editMode}
							<div class="flex items-center space-x-4">
								<select
									bind:value={$updateForm.status}
									on:change={handleFieldUpdate}
									class="rounded-md border border-gray-300 px-l-3 pr-8 py-1 text-sm"
								>
									<option value="Backlog"> Backlog</option>
									<option value="Todo">Todo</option>
									<option value="In Review">In Review</option>
									<option value="Done">Done</option>
									<option value="Canceled">Canceled</option>
								</select>
								{#if $updateErrors?.status}
									<p class="mt-1 text-xs text-red-600">{$updateErrors?.status}</p>
								{/if}
								<select
									bind:value={$updateForm.priority}
									on:change={handleFieldUpdate}
									class="rounded-md border border-gray-300 px-l-3 pr-8 py-1 text-sm"
								>
									<option value="Low">Low</option>
									<option value="Medium">Medium</option>
									<option value="High">High</option>
								</select>
								{#if $updateErrors?.priority}
									<p class="mt-1 text-xs text-red-600">{$updateErrors?.priority}</p>
								{/if}
							</div>
						{:else}
							<StatusBadge status={data.task.status} />
							<PriorityBadge priority={data.task.priority} />
						{/if}
					</div>
				</div>
				<div class="flex items-center space-x-3">
					<button
						class="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
						on:click={() => (editMode = !editMode)}
					>
						<svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
							></path>
						</svg>
						{editMode ? 'Cancel' : 'Edit'}
					</button>
				</div>
			</div>
		</div>

		<div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
			<div class="space-y-8 lg:col-span-2">
				<div class="rounded-lg border border-gray-200 bg-white p-6">
					<h2 class="mb-4 text-lg font-semibold text-gray-900">Description</h2>
					<p class="leading-relaxed text-gray-700">{data.task.description}</p>
				</div>

				<div class="rounded-lg border border-gray-200 bg-white p-6">
					<h2 class="mb-4 text-lg font-semibold text-gray-900">
						Comments ({data.comments.length})
					</h2>
					<div class="space-y-4">
						{#each data.comments as comment}
							<div class="flex space-x-3">
								<div
									class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-sm font-medium text-white"
								>
									{comment.user.name.charAt(0).toUpperCase()}
								</div>
								<div class="flex-1">
									<div class="mb-1 flex items-center space-x-2">
										<span class="text-sm font-medium text-gray-900">{comment.user.name}</span>
										<span class="text-xs text-gray-500">{formatDate(comment.created)}</span>
									</div>
									<p class="text-sm text-gray-700">{comment.content}</p>
								</div>
							</div>
						{/each}
					</div>

					<div class="mt-6 border-t border-gray-200 pt-6">
						<form method="POST" action="?/addComment" class="flex space-x-3">
							<div
								class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-sm font-medium text-white"
							>
								U
							</div>
							<div class="flex-1">
								<input type="hidden" bind:value={taskId} name="issueId" />
								<textarea
									bind:value={$commentFormData.content}
									name="content"
									placeholder="Add a comment..."
									class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
									rows="3"
								></textarea>
								{#if $commentErrors?.content}
									<p class="mt-1 text-sm text-red-600">{$commentErrors?.content}</p>
								{/if}
								<div class="mt-2 flex justify-end">
									<button
										type="submit"
										class="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
									>
										Comment
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>

			<div class="space-y-6">
				<div class="rounded-lg border border-gray-200 bg-white p-6">
					<h3 class="mb-4 text-lg font-semibold text-gray-900">Details</h3>
					<div class="space-y-4">
						<div>
							<label class="text-sm font-medium text-gray-500" for="status">Status</label>
							<div class="mt-1">
								<StatusBadge status={data.task.status} />
							</div>
						</div>
						<div>
							<label class="text-sm font-medium text-gray-500" for="priority">Priority</label>
							<div class="mt-1">
								<PriorityBadge priority={data.task.priority} />
							</div>
						</div>
						<div>
							<label class="text-sm font-medium text-gray-500" for="dueDate">Due Date</label>
							<p class="mt-1 text-sm text-gray-900">
								{data.task.dueDate ? formatDateShort(data.task.dueDate) : '🟡'}
							</p>
						</div>
						<div>
							<label class="text-sm font-medium text-gray-500" for="assignedTo">Assigned To</label>
							{#if editMode}
								<div class="mt-1">
									<select
										bind:value={$updateForm.assignedUserId}
										on:change={handleFieldUpdate}
										class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
									>
										<option value={null}>Unassigned</option>
										{#each data.users as user}
											<option value={user.id}>
												{user.name}
											</option>
										{/each}
									</select>
									{#if $updateErrors?.assignedUserId}
										<p class="mt-1 text-xs text-red-600">{$updateErrors?.assignedUserId}</p>
									{/if}
									Fv
								</div>
							{:else}
								<div class="mt-1 flex items-center space-x-2">
									<div
										class="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-xs font-medium text-white"
									>
										{data.task.assignedUser?.name.charAt(0).toUpperCase()}
									</div>
									<span class="text-sm text-gray-900">{data.task.assignedUser?.name}</span>
								</div>
							{/if}
						</div>
						<div>
							<label class="text-sm font-medium text-gray-500" for="created">Created</label>
							<p class="mt-1 text-sm text-gray-900">{formatDateShort(data.task.created)}</p>
						</div>
						<div>
							<label class="text-sm font-medium text-gray-500" for="updated">Last Updated</label>
							<p class="mt-1 text-sm text-gray-900">{formatDateShort(data.task.updated)}</p>
						</div>
					</div>
				</div>

				{#if data.attachments.length > 0}
					<div class="rounded-lg border border-gray-200 bg-white p-6">
						<h3 class="mb-4 text-lg font-semibold text-gray-900">
							Attachments ({data.attachments.length})
						</h3>
						<div class="space-y-2">
							{#each data.attachments as attachment}
								<div class="flex items-center space-x-3 rounded p-2 hover:bg-gray-50">
									<svg
										class="h-5 w-5 text-gray-400"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
										></path>
									</svg>
									<div class="min-w-0 flex-1">
										<p class="truncate text-sm font-medium text-gray-900">{attachment.name}</p>
										<p class="text-xs text-gray-500">{formatDateShort(attachment.created)}</p>
									</div>
									<button
										class="text-gray-400 hover:text-gray-600"
										aria-label="Download attachment"
									>
										<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
											></path>
										</svg>
									</button>
								</div>
							{/each}
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
