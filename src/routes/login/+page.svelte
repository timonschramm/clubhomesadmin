<!-- src/routes/+page.svelte -->
<script lang="ts">
	import { supabase } from '$lib/supabase';


	import Input from '$lib/components/Input.svelte';
	import MailIcon from '$lib/assets/mail.svg';
	import LockIcon from '$lib/assets/password.svg';

	
	import type { PageData } from './$types';


	let error = '',
		message = '',
		loading = false,
		userEmail = '',
		passWord = '';
	
	async function submit() {
		error = '';
		message = '';
		loading = true;

		if (passWord == "") {
			error = 'Bitte gib ein Passwort ein';
			return;
		}

		const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
            email: userEmail,
			password: passWord,
        })
		console.log(signInData.user?.email);
		if (signInError) {
			error = signInError.message;
		} else {
            message = 'Erfolgreich angemeldet Yuhuuu!';
            return {
            headers: { Location: '/account' },
                status: 302
            }   
        }
	}
</script>

<svelte:head>
	<title>User Management</title>
</svelte:head>
<div />
<div class="standard-Wrapper">
	<h1>Login</h1>
	<div>
		<form  action="?/login" method="POST">
			<Input label="Email" type="email" name="email" bind:value={userEmail} iconPath={MailIcon} />

			<Input
				label="Password"
				type="password"
				name="password"
				bind:value={passWord}
				iconPath={LockIcon}
			/>
		
			<input type="submit" value="Anmelden" />
		</form>
		{#if error}
			<p>{error}</p>
		{/if}
		{#if message}
			<p>{message}</p>
		{/if}
        <p>Sie haben noch keinen Account? <a href="/">Jetzt Registrieren</a></p>
	</div>
</div>

<style>
	.standard-Wrapper {
		display: flex;
		flex-direction: column;	
	}
</style>