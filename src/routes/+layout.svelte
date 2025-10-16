<script lang="ts">
	import favicon from '$lib/assets/favicon.ico';
	import { signOut } from '@auth/sveltekit/client';
	import '../app.css';
	
	let props = $props();
	let { children, data } = props;

	// console.log('form data', props.form?.data);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="min-h-screen bg-gray-50">
	{#if data.session?.user}
		<nav class="bg-white shadow-sm border-b">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div class="flex justify-between h-16">
					<div class="flex items-center">
						<h1 class="text-xl font-semibold text-gray-900">Dashboard</h1>
					</div>
					<div class="flex items-center space-x-4">
						<div class="flex items-center space-x-3">
							{#if data.session.user.image}
								<img 
									src={data.session.user.image} 
									alt={data.session.user.name || 'User'} 
									class="h-8 w-8 rounded-full"
								/>
							{/if}
							<span class="text-sm font-medium text-gray-700">
								{data.session.user.name || data.session.user.email}
							</span>
						</div>
						<button
							onclick={() => signOut()}
							class="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
						>
							Sign Out
						</button>
					</div>
				</div>
			</div>
		</nav>
	{/if}
	
	<main>
		{@render children?.()}
	</main>
</div>
