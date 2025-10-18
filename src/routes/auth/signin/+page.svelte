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
		<div class="my-4 flex items-center">
			<div class="flex-1 border-t border-gray-300"></div>
			<span class="px-4 text-sm text-gray-500">or</span>
			<div class="flex-1 border-t border-gray-300"></div>
		</div>
		<button
			onclick={() => signIn('anonymous', { callbackUrl: '/board' })}
			class="w-full bg-white text-gray-700 py-2 px-4 rounded border border-gray-300 hover:bg-gray-50"
		>
			Continue as Guest
		</button>
	</div>
</div>
