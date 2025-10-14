<script lang="ts">
	import type { Status } from '$lib/types';
	export let status: Status;
	
	const statusStyles = {
		'Backlog': 'bg-gray-100 text-gray-800 border-gray-200',
		'Todo': 'bg-blue-100 text-blue-800 border-blue-200',
		'In Review': 'bg-purple-100 text-purple-800 border-purple-200',
		'Done': 'bg-green-100 text-green-800 border-green-200',
		'Canceled': 'bg-red-100 text-red-800 border-red-200'
	};
</script>

<span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border {statusStyles[status]}">
	{status}
</span>
