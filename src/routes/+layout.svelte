<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import '../styles.css';
	import { invalidate } from '$app/navigation'
	import { onMount } from 'svelte'
	import type { LayoutData } from './$types'
	import { HeaderTop, Footer, AdminSidebar } from '$lib/components';
	
	export let data: LayoutData

	$: ({ supabase } = data)

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange(() => {
			invalidate('supabase:auth')
		})

		return () => data.subscription.unsubscribe()
	})
</script>

<svelte:head>
	<title>User Management</title>
</svelte:head>
<div class="page">
	<div class="adminsidebar-Wrapper">
		<AdminSidebar/>
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
	}

	@media (max-width: 768px) {
		.adminsidebar-Wrapper {
			display: none;
		}
		.mainPage {
			width: 100%;
		}
	}
</style>