<!-- src/routes/+page.svelte -->
<script lang="ts">
	import Input from '$lib/components/forms/Input.svelte';
	import type { PageData, ActionData } from './$types';
	export let form: ActionData;

	let error = form?.error,
		message = form?.message,
		userEmail = '',
		passWord = '',
		passWordCheck = '';
</script>

<!-- <svelte:head>
	<title>User Management</title>
</svelte:head> -->
<div
	class="flex flex-col items-center max-w-lg sm:w-full px-6 py8 md:mx-auto justify-center h-screen lg:py-0 lg:w-1/2"
>
	<a
		href="https://matchmap.de"
		class="flex items-center mb-6 font-semibold text-gray-900 dark:text-black"
	>
		<img class="w-full h-12 mr-2" src="/matchmapf.png" alt="logo" />
	</a>
	<div
		class="w-full bg-white rounded-lg shadow-l dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-white300 dark:border-gray-700"
	>
		<div class="p-6 space-y md:space-y-6 sm:p-8">
			<h1
				class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-dark"
			>
				Registrieren
			</h1>

			<div class="w-full">
				<form class="space-y-4 md:space-y-6" action="?/register" method="POST">
					<Input
						label="Email"
						type="email"
						name="email"
						bind:value={userEmail}
						iconPath="/mail.svg"
					/>

					<Input
						label="Password"
						type="password"
						name="password"
						bind:value={passWord}
						iconPath="/password.svg"
					/>
					<Input
						label="Password Bestätigen"
						type="password"
						name="check_password"
						bind:value={passWordCheck}
						iconPath="/password.svg"
					/>
					{#if passWord !== passWordCheck && passWordCheck !== ''}
						<p class="text-red-500 text-sm mt-5">Passwörter stimmen nicht überein</p>
					{/if}

					
					<Input type="submit" value="Registrieren" />
				</form>
				{#if error}
					<p>{error}</p>
				{/if}
				{#if message}
					<p>{message}</p>
				{/if}
				<p class="text-sm font-light text-gray-500 dark:text-gray-500 mt-8">
					Sie haben bereits einen Account? <a
						href="/accounts/login"
						class="font-medium text-blue-500 hover:underline dark:text-primary-500">Anmelden</a
					>
				</p>
			</div>
		</div>
	</div>
</div>

<style>
	.mt-5 {
		margin-top: 5px !important;
	}
</style>
