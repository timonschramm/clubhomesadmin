<script>
	export let open = false
	import MenuLinks from "./MenuLinks.svelte";
</script>

<aside class="" class:open>
	<div class="sidebar-Wrapper">
		<nav class="sidebar">
			<MenuLinks class="sidebar-item" bind:open/>
		</nav>
	</div>
	
</aside>

<style>

	:global(.sidebar-Wrapper .sidebar-item a){
		display: block;
	}
	
	.open {
		right: 0
	}
	aside {
		position: absolute;
		right: 100%;
		transition: right 0.3s ease-in-out;
		width: 100%;
		height: 100%;
		background-color: #F2F2F2;
        z-index: 1000;
	}
	.sidebar-Wrapper {
        padding: 20px;
    }
    :global(.sidebar-Wrapper a) {
        text-decoration: none;
    }
    :global(.sidebar-Wrapper a:hover) {
        text-decoration: underline;
    }
	:global(.sidebar-item) {
        display: block;
    }
    .sidebar {
        padding: 12px;
    }
</style>