<script>
    export let open = false
  function closeSidebar(){
    open = false;
  }
</script>

<div class={$$props.class}>
<a href="/" class="" on:click={closeSidebar}>Home</a>
<a href="/dashboard" class="" on:click={closeSidebar}>Dashboard</a>
<a href="/account" class="" on:click={closeSidebar}>Account</a>
<a href="/login" class="" on:click={closeSidebar}>Login</a>

</div>