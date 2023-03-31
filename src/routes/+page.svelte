<!-- src/routes/+page.svelte -->
<script lang="ts">
	import { supabase } from '$lib/supabase';
	import '../styles.css';
	import Input from '$lib/components/forms/Input.svelte';
	import MailIcon from '$lib/assets/mail.svg';
	import LockIcon from '$lib/assets/password.svg';

	import type { PageData, ActionData } from './$types';
	export let form: ActionData;

	let error = form?.error,
		message = form?.message,
		userEmail = '',
		passWord = '',
		passWordCheck = '';
	
</script>

<svelte:head>
	<title>User Management</title>
</svelte:head>
	<div class="standard-Wrapper">
		<h1>Registrieren</h1>
		<div>
			<form action="?/register" method="POST">
				<Input label="Email" type="email" name="email" bind:value={userEmail} iconPath="/mail.svg" />
	
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
					name="userCheckPassword"
					bind:value={passWordCheck}
					iconPath="/password.svg"
				/>
				<input type="submit" value="Registrieren" />
			</form>
			{#if error}
				<p>{error}</p>
			{/if}
			{#if message}
				<p>{message}</p>
			{/if}
			<p>Passwörter sind {passWord === passWordCheck ? 'gleich' : 'nicht gleich'}</p>
		</div>
		<p>Sie haben bereits einen Account? <a href="/login">Jetzt Anmelden</a></p>
	</div>
	

	

<style>
	.standard-Wrapper {
		display: flex;
		flex-direction: column;
	}
</style>