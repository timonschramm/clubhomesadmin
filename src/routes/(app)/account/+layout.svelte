<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import '../../../styles.css';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { LayoutData } from '../$types';
	import { HeaderTop, AdminSidebar } from '$lib/components';

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
	<title>User Management</title>
</svelte:head>
<div class="page">
	<div class="adminsidebar-Wrapper">
		<AdminSidebar />
	</div>

	<div class="mainPage">
		<HeaderTop />
		<div>
			<slot />
		</div>
	</div>
</div>

<style>
	.page {
		display: flex;
		flex-direction: row;
	}
	.mainPage {
		width: 100%;
	}
	.adminsidebar-Wrapper {
		width: 20%;
		height: 100vh;
		position: fixed;
	}

	@media (max-width: 768px) {
		.adminsidebar-Wrapper {
			display: none;
		}
		.mainPage {
			width: 100%;
			margin-left: 0% !important;
		}
	}
	@media (min-width: 768px) {
		.mainPage {
			width: 100%;
			margin-left: 20%;
		}
	}

	@media (min-width: 1024px) {
	}
</style>
