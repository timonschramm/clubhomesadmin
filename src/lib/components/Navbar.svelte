<script lang="ts">
	import Logo from './Logo.svelte'
    import sponsorLogo from '../assets/spotifyLogo.png'
	import {Hamburger}  from 'svelte-hamburgers';
    export let sidebar = false; 
    import MenuLinks from './MenuLinks.svelte';

</script>

<header class="headerMenu">
	<nav class="navbar">
        <div  class="burgerOpener">
            <!-- https://www.npmjs.com/package/svelte-hamburgers?ref=madewithsvelte.com -->
          
             {#if sidebar}
                <Hamburger --color="black" bind:open={sidebar}/>
            {/if}
            {#if !sidebar}
                <Hamburger --color="black" bind:open={sidebar}/>
            {/if}
        </div>
	</nav>
	
	
</header>
<style is:global>
  
    .headerMenu{
        padding: 0.4rem;
    }
    .navbar{
        display: flex;
        justify-content: flex-end;
    }
    .burgerOpener{
        display: flex;
    }
    
   
    .burgerOpener{
        display: flex;
    }

    @media (max-width: 768px) {
       
    }
    @media (min-width: 768px){
        
    }   

    @media (min-width: 1024px){
        .burgerOpener{
            display: none;
        }
     
         :global(.desktopMenu .menu a) {
            margin-right: 10px; 
            text-decoration: none !important;
            font-weight: bold;
        }
        :global(.desktopMenu .menu a:hover){
           color: #808080;
        }
   
    }

    @media (min-width: 1366px){
        .navbar {
            margin-left: 10%;
            margin-right: 10%;
        }
    }
    @media (min-width: 1920px){
        .navbar {
            margin-left: 14%;
            margin-right: 14%;
        }
    }
    @media (min-width: 2560px){

    }

</style>