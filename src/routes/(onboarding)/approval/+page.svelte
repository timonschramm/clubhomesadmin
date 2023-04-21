<script lang="ts">
	import FirstChooseTeam from '$lib/components/First_Choose_Team.svelte';
	import ProgressBar from '$lib/components/ProgressBar.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
	let steps = ["Registrierung", "Team", "Bestätigung"]
	let currentActive =  1;
	let progressBar;
</script>

<div
	class="flex flex-col items-center max-w-lg sm:w-full px-6 py8 md:mx-auto justify-center h-screen lg:py-0 lg:w-1/2"
>
    <ProgressBar {steps} currentActive={3}/>
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
