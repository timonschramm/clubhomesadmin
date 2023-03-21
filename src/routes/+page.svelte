<!-- src/routes/+page.svelte -->
<script lang="ts">
	import { Auth } from '@supabase/auth-ui-svelte';
	import { ThemeSupa } from '@supabase/auth-ui-shared';
	import { createClient } from '@supabase/supabase-js';
	import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
	import { myFormStore } from './lib/store';
	const { passWordWritable, passWordCheckWritable } = myFormStore;

	import Input from './lib/components/Input.svelte';
	import MailIcon from './lib/assets/mail.svg';
	import LockIcon from './lib/assets/password.svg';

	const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);
	import type { PageData } from './$types';

	export let data: PageData;

	let error = '',
		message = '',
		loading = false,
		userEmail = '';

	async function submit() {
		error = '';
		message = '';
		loading = true;
		if (passWordWritable !== passWordCheckWritable) {
			error = 'Passwörter stimmen nicht überein';
			return;
		}

		const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
			email: userEmail,
			password: $passWordWritable,
		});
		console.log(signUpData.user?.email);
		if (signUpError) {
			error = signUpError.message;
		} else {
			message = 'Check your email for the login link!';
		}
	}
</script>

<svelte:head>
	<title>User Management</title>
</svelte:head>
<div />
<div class="">
	<div>
		<form on:submit={submit}>
			<Input label="Email" type="email" name="email" bind:value={userEmail} iconPath={MailIcon} />

			<Input
				label="Password"
				type="password"
				name="password"
				value={$passWordWritable}
				iconPath={LockIcon}
			/>
			<Input
				label="Password Bestätigen"
				type="password"
				name="userCheckPassword"
				value={$passWordCheckWritable}
				iconPath={LockIcon}
			/>
			<input type="submit" value="Registrieren" />
		</form>
		<p>{$passWordWritable}</p>
		<p>Passwörter ist {$passWordWritable === $passWordCheckWritable ? 'gleich' : 'nicht gleich'}</p>
	</div>
</div>
