<script>
	export let open = false;
	import AdminSidebarItem from './AdminSidebarItem.svelte';
	import AdminSidebarDropdownItem from './AdminSidebarDropdownItem.svelte';

	let show_dashboard_dropdwon = true;
	let added_class = ""
	import { fade, slide } from 'svelte/transition';
	if(open){
		added_class = "slide-out"
	}
</script>

<aside
	class="fixed top-0 left-0 z-40 w-3/5 h-screen {open ? 'slide-in' : added_class}"
	id="slider"
	aria-label="Sidebar"
>
	<div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 ">
		<a href="/" class="flex items-center pl-2.5 mb-5">
			<img src="/FC_Barcelona.png" class="w-16 xxl:w-20" alt="Club Logo" />
		</a>
		<ul class="space-y-2 font-medium grid h-5/6 auto-rows-max">
			<AdminSidebarItem text="Home" notifications={true} svg_form="/home.svg" />
			<AdminSidebarItem text="Team" svg_form="/team.svg" />
			<li>
				<AdminSidebarDropdownItem text="Dashboard" bind:show_dashboard_dropdwon />
				{#if show_dashboard_dropdwon}
					<ul
						transition:slide={{ duration: 300 }}
						id="dropdown-example"
						class="py-2 space-y-2 ml-4"
					>
						<AdminSidebarItem text="Events" link="/dashboard/#calendar" svg_form="/calendard.svg" />
						<AdminSidebarItem
							text="Sponsoren"
							link="/dashboard/#sponsoren"
							svg_form="/sponsors.svg"
						/>
						<AdminSidebarItem text="News" link="/dashboard/#news" svg_form="/news.svg" />
						<AdminSidebarItem
							text="Social Media"
							link="/dashboard/#socials"
							svg_form="/share.svg"
						/>
					</ul>
				{/if}
			</li>
			<div class="mt-auto">
				<AdminSidebarItem text="Abmelden" link="/logout" svg_form="/logout.svg" />
			</div>
		</ul>
	</div>
</aside>

<style>
	#slider {
		height: 100%;
		transform: translateX(-100%);
		-webkit-transform: translateX(-100%);
	}

	.slide-in {
		animation: slide-in 0.5s forwards;
		-webkit-animation: slide-in 0.5s forwards;
	}

	.slide-out {
		animation: slide-out 0.5s forwards;
		-webkit-animation: slide-out 0.5s forwards;
	}

	@keyframes slide-in {
		100% {
			transform: translateX(0%);
		}
	}

	@-webkit-keyframes slide-in {
		100% {
			-webkit-transform: translateX(0%);
		}
	}

	@keyframes slide-out {
		0% {
			transform: translateX(0%);
		}
		100% {
			transform: translateX(-100%);
		}
	}

	@-webkit-keyframes slide-out {
		0% {
			-webkit-transform: translateX(0%);
		}
		100% {
			-webkit-transform: translateX(-100%);
		}
	}
</style>
