<!-- src/routes/+page.svelte -->
<script lang="ts">
	import { supabase } from '$lib/supabase';

	import Input from '$lib/components/forms/Input.svelte';
	import MailIcon from '$lib/assets/mail.svg';
	import LockIcon from '$lib/assets/password.svg';

	import type { PageData, ActionData } from './$types';
	export let form: ActionData;

	let userEmail = '';
	let userPassword = '';
</script>

<svelte:head>
	<title>MatchMap</title>
</svelte:head>
<div />
<div class="standard-Wrapper">
	<h1>Login</h1>
	<div>
		<form action="?/login" method="POST">
			<Input label="Email" type="email" name="email" bind:value={userEmail} iconPath="/mail.svg" />

			<Input
				label="Password"
				type="password"
				name="password"
				bind:value={userPassword}
				iconPath="/password.svg"
			/>

			<Input type="submit" value="Anmelden" />
		</form>

		{#if form?.error}
			<div class=formError>
				<p>{form?.error}</p>
			</div>
		{/if}

		{#if form?.message}
			<p>{form?.message}</p>
		{/if}
		<p>Du hast kein Konto? <a href="/">Registrieren</a></p>
	</div>
</div>

<style>
	.standard-Wrapper {
		display: flex;
		flex-direction: column;
	}
	.formError {
		color: #ED4956
	}
</style>
