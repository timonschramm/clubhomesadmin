<script lang="ts">
	import FirstChooseTeam from '$lib/components/First_Choose_Team.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<div
	class="flex flex-col items-center max-w-lg sm:w-full px-6 py8 md:mx-auto justify-center h-screen lg:py-0 lg:w-1/2"
>
	<ol
		class="flex items-center justify-center mb-6 w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4"
	>
    <li class="flex items-center">
        <span
				class="flex items-center justify-center w-5 h-5 mr-2 text-xs border border-gray-500 rounded-full shrink-0 dark:border-gray-400"
			>
				1
			</span>
			Registrierung <!-- <span class="hidden sm:inline-flex sm:ml-2">Info</span> -->
			<svg
				aria-hidden="true"
				class="w-4 h-4 ml-2 sm:ml-4"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M13 5l7 7-7 7M5 5l7 7-7 7"
				/></svg
			>
		</li>
		<li class="flex items-center">
			<span
				class="flex items-center justify-center w-5 h-5 mr-2 text-xs border border-gray-500 rounded-full shrink-0 dark:border-gray-400"
			>
				2
			</span>
			Team <!-- <span class="hidden sm:inline-flex sm:ml-2">Info</span> -->
			<svg
				aria-hidden="true"
				class="w-4 h-4 ml-2 sm:ml-4"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M13 5l7 7-7 7M5 5l7 7-7 7"
				/></svg
			>
		</li>
		<li class="flex items-center text-blue-600 dark:text-blue-500">
			<span
				class="flex items-center justify-center w-5 h-5 mr-2 text-xs border border-blue-600 rounded-full shrink-0 dark:border-blue-500"
			>
				3
			</span>
			Bestätigung
		</li>
	</ol>
	<div
		class="w-full bg-white rounded-lg shadow-l dark:border md:mt-0 xl:p-0 dark:bg-white300 dark:border-gray-700"
	>
		<div class="space-y md:space-y-6 sm:p-8 p-4">
			<h1
				class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-dark"
			>
				Warte auf Bestätigung
			</h1>
			<p class="text-gray-600 dark:text-gray-400">
				Deine Registrierung ist fast abgeschlossen. Du wirst in kürze von einem unserer Mitarbeiter
				zu deinem Team <span class="font-bold">{data.ownTeam}</span> zugelassen.
			</p>
		</div>
	</div>
</div>
