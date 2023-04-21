<script lang="ts">
	import FirstChooseTeam from '$lib/components/First_Choose_Team.svelte';
	import ProgressBar from '$lib/components/ProgressBar.svelte';
	import type { PageData } from './$types';
	export let data: PageData;

	let steps = ['Registrierung', 'Team', 'Bestätigung'];
	let currentActive = 1;
	let progressBar;
</script>

<div
	class="py8 mx-auto flex h-screen max-w-lg flex-col items-center justify-center px-2 sm:w-full sm:px-6 lg:w-1/2 lg:py-0"
>
	<ProgressBar {steps} currentActive={2} />
	<div
		class="shadow-l dark:bg-white300 w-full rounded-lg bg-white dark:border dark:border-gray-700 md:mt-0 xl:p-0"
	>
		<div class="space-y p-4 sm:p-8 md:space-y-6">
			<h1
				class="dark:text-dark text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl"
			>
				Wähle dein Team
			</h1>
			<div class="w-full">
				<FirstChooseTeam teamName={data.ownTeam} teams_by_id={data.teamData} />
			</div>
		</div>
	</div>
</div>
