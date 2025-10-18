<script lang="ts">
	import { signIn } from '@auth/sveltekit/client';
</script>

<div class="min-h-screen bg-gray-50 flex items-center justify-center">
	<div class="max-w-md w-full bg-white p-8 rounded-lg shadow">
		<div class="text-center mb-6">
			<svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
			</svg>
			<h1 class="text-2xl font-bold mt-4">Upgrade Your Account</h1>
			<p class="text-gray-600 mt-2">Sign in to access this feature and save your work</p>
		</div>
		<button
			onclick={() => signIn('github')}
			class="w-full bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800"
		>
			Sign in with GitHub
		</button>
		<p class="mt-4 text-center text-sm text-gray-500">
			Your guest session data will be preserved after signing in
		</p>
	</div>
</div>
