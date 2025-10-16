<script lang="ts">
	import { signIn } from '@auth/sveltekit/client';
</script>

<div class="min-h-screen bg-gray-50 flex items-center justify-center">
	<div class="max-w-md w-full bg-white p-8 rounded-lg shadow">
		<h1 class="text-2xl font-bold mb-6 text-center">Sign In</h1>
		<button
			onclick={() => signIn('github')}
			class="w-full bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800"
		>
			Sign in with GitHub
		</button>
	</div>
</div>
