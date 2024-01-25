<!-- src/routes/+layout.svelte -->
<script lang="ts">
	
	import '../app.postcss';
	import '../styles.css';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	$: ({ supabase } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange(() => {
			invalidate('supabase:auth');
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<svelte:head>
	<title>MatchMap</title>
</svelte:head>
<div class="page">
	<slot />
</div>

<style>
</style>
