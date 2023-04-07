<!-- src/routes/+page.svelte -->
<script lang="ts">
	import Input from '$lib/components/forms/Input.svelte';
	import type { PageData, ActionData } from './$types';
	export let form: ActionData;

	let userEmail = '';
	let userPassword = '';
</script>

<svelte:head>
	<title>MatchMap</title>
</svelte:head>

<div
	class="flex flex-col items-center sm:w-full justify-center px-6 py-8 md:mx-auto h-screen lg:py-0  lg:w-1/2"
>
	<div class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-black">
		<img class="w-12 h-12 mr-2" src="/FC_Barcelona.png" alt="logo" />
		FC Barcelona
	</div>
	<div
		class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-white-300 dark:border-gray-700"
	>
		<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
			<h1
				class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-dark"
			>
				Login
			</h1>
			<form class="space-y-4 md:space-y-6" action="?/login" method="POST">
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
					bind:value={userPassword}
					iconPath="/password.svg"
				/>
				{#if form?.error}
					<div class="text-red-500 mt-5">
						<p class="text-sm">{form?.error}</p>
					</div>
				{/if}
				<div class="flex items-center justify-between">
					<div class="flex items-start">
						<div class="flex items-center h-5">
							<input
								id="remember"
								aria-describedby="remember"
								type="checkbox"
								class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
							/>
						</div>
						<div class="ml-3 text-sm">
							<label for="remember" class="text-gray-500 dark:text-gray-500"
								>Angemeldet bleiben</label
							>
						</div>
					</div>
					<a
						href="/accounts/reset_password"
						class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
						>Passwort vergessen?</a
					>
				</div>
				<Input type="submit" value="Anmelden" />
			</form>

			{#if form?.message}
				<p>{form?.message}</p>
			{/if}
			<p class="text-sm font-light text-gray-500 dark:text-gray-400">
				Du hast kein Konto? <a
				href="/accounts/emailsignup"
				class="font-medium text-blue-500 hover:underline dark:text-primary-500">Registrieren</a
			>
			</p>
		</div>
	</div>
</div>

<style>
</style>
