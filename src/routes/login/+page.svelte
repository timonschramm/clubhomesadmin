<!-- src/routes/+page.svelte -->
<script lang="ts">
    import { fail, redirect } from '@sveltejs/kit';

	import { createClient } from '@supabase/supabase-js';
	import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';

	import Input from '../lib/components/Input.svelte';
	import MailIcon from '../lib/assets/mail.svg';
	import LockIcon from '../lib/assets/password.svg';

	const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);
	import type { PageData } from './$types';

	export let data: PageData;

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
<div class="">
	<h1>Login</h1>
	<div>
		<form on:submit={submit} action="?/login">
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
