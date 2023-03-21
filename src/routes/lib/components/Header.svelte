<!-- src/lib/components/Header.svelte -->
<script lang="ts">
    import type { Session } from '@supabase/supabase-js';
  
    export let session: Session | null;
  </script>
  
  {#if !session}
    <h1>I am not logged in</h1>
  {:else}
    <h1>Welcome {session.user.email}</h1>
    <p>I am logged in!</p>
  {/if}