<script>
	import Logo from './Logo.svelte'
    import sponsorLogo from '../assets/spotifyLogo.png'
	import { Hamburger } from 'svelte-hamburgers';
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
    .mainSponsor{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100px;
    }
    .mainSponsor img{
        width: 100%;
    }
    .desktopMenu {
            display: none
        }
    .burgerOpener{
        display: flex;
    }

    @media (max-width: 768px) {
       
    }
    @media (min-width: 768px){
        .mainSponsor {
            width: 130px;
        }
    }   

    @media (min-width: 1024px){
        .burgerOpener{
            display: none;
        }
        .desktopMenu {
            display: flex;
            text-decoration: none !important;
            align-items: center;
            justify-content: space-between;
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