<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	
	onMount(() => {
		goto('/board');
	});
</script>

<div class="min-h-screen bg-gray-50 flex items-center justify-center">
	<div class="text-center">
		<div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
		<p class="text-gray-600">Redirecting to board...</p>
	</div>
</div>
