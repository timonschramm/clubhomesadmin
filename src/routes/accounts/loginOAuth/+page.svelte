<!-- src/routes/+page.svelte -->
<script lang="ts">
	import { supabase } from '$lib/supabase';

	import Input from '$lib/components/forms/Input.svelte';
    import Auth from 'supabase-ui-svelte';
	
	import type { PageData, ActionData } from './$types';
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
        <Auth socialColors={true} providers={['google', 'facebook', 'azure']} supabaseClient={supabase}/>
    </div>
	
</div>

<style>
	.standard-Wrapper {
		display: flex;
		flex-direction: column;	
	}
</style>