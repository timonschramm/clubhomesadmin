<script>
    import MenuLinks from "./MenuLinks.svelte";
    import Logo from './Logo.svelte'
</script>
<div class="dashboardSidebar">
    <div class="logoSidebar">
        <Logo/>
    </div>
    <div class="sidebarLinks">
        <MenuLinks class="sidebar-item"/>
    </div>
</div>

<style>
    .dashboardSidebar {
        background-color: #181733;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        
    }
    .logoSidebar {
        padding-top: 20px;
        width: 100%;
        display: flex;
        justify-content: center;
        }
    .sidebarLinks {
        padding-top: 20px;
        padding-left: 30px;
        line-height: 4rem;
    }
    :global(.dashboardSidebar .sidebar-item){
        display: flex;
        flex-direction: column;
    }
    :global(.dashboardSidebar .sidebar-item a){
        display: flex;
        flex-direction: column;
        color: #f2f2f2 !important;
        text-decoration: none;
    }
    
</style>