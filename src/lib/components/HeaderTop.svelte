<script>
    let open = false;
    import Sidebar from "./Sidebar.svelte";
    import Navbar from "./Navbar.svelte";
</script>

<Sidebar bind:open/>
<Navbar bind:sidebar={open}/>