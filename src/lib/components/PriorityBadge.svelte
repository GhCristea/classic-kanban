<script lang="ts">
	import type { Priority } from '$lib/types';
	export let priority: Priority;
	
	const priorityStyles = {
		Low: 'bg-blue-100 text-blue-800 border-blue-200',
		Medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
		High: 'bg-red-100 text-red-800 border-red-200'
	};
</script>

<span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border {priorityStyles[priority]}">
	{priority}
</span>
