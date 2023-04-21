<script>
	import AdminSidebarItem from './AdminSidebarItem.svelte';
	import AdminSidebarDropdownItem from './AdminSidebarDropdownItem.svelte';

	let show_dashboard_dropdwon = true;
	import { slide } from 'svelte/transition';
</script>

<aside
	class="open fixed top-0 left-0 z-40 w-1/5 h-screen transition-transform -translate-x-full lg:translate-x-0"
	id="logo-sidebar"
	aria-label="Sidebar"
>
	<div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
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

<!-- <li>
				<a
					href="#"
					class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
				>
					<svg
						aria-hidden="true"
						class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						><path
							d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
						/></svg
					>
					<span class="flex-1 ml-3 whitespace-nowrap">Kanban</span>
					<span
						class="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300"
						>Pro</span
					>
				</a>
			</li> -->

<!-- <li>
				<a
					href="#"
					class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
				>
					<svg
						aria-hidden="true"
						class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						><path
							fill-rule="evenodd"
							d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
							clip-rule="evenodd"
						/></svg
					>
					<span class="flex-1 ml-3 whitespace-nowrap">Users</span>
				</a>
			</li> -->
