<script>
	import Input from '$lib/components/forms/Input.svelte';
	export let opponent = '';
	export let location = '';
	export let gameDate = '';
	export let gameTime = '';
	export let teams_by_id = {};
	export let locations_by_id = {};
	let my_id = '';
	let event_type = 'game';
	$: {
		let event_type = 'game';
		console.log(event_type);
	}
	let teams = [''];

	function new_team() {
		teams[teams.length] = '';
	}

	async function create_event() {
		const formdata = new FormData(this);
		if (event_type === 'tournament') {
			formdata.append('teams', JSON.stringify(teams));
			console.log("teams added:  ", teams)
		}
		const response = await fetch('?/createEvent', {
			method: 'POST',
			body: formdata
		});
		const result = await response.json();

		if (result.type === 'success') {
			console.log('Neuer Sponsor erstellt!');
		}
	}
</script>

<div>
	<h3>Neues Event</h3>
	
	<div class="pb-4 flex flex-col items-center">
		<div class="flex w-full relative">
			<input
				class="appearance-none"
				bind:group={event_type}
				type="radio"
				name="event_type"
				id="game"
				checked
				hidden
				value={'game'}
			/>
			<label
				for="game"
				class=" cursor-pointer w-1/4 sm:w-1/6 flex items-center justify-center truncate uppercase select-none font-semibold text-md rounded-full py-2 {event_type === 'game' ? "text-white" : ""} "
				>Spiel</label
			>

			<input
				class="appearance-none radio"
				bind:group={event_type}
				type="radio"
				name="event_type"
				id="tournament"
				checked
				hidden
				value={'tournament'}
			/>
			<label
				for="tournament"
				class=" cursor-pointer w-1/4 sm:w-1/6  flex items-center justify-center truncate uppercase select-none font-semibold text-md rounded-full py-2 {event_type === 'tournament' ? "text-white" : ""} "
				>Turnier</label 
			>
			<div
				class="w-1/4 sm:w-1/6 flex items-center justify-center truncate uppercase select-none font-semibold text-lg rounded-full p-0 h-full bg-blue-700 absolute transform transition-transform tabAnim"
			/>
		</div>
	</div>

	<form on:submit|preventDefault={create_event} method="POST">
		{#if event_type === 'tournament'}
		<Input
			name="turniername"
			label="Turniername"
		/>
		{/if}
		<Input
			requiredVal={true}
			bind:value={gameDate}
			name="gameDay"
			iconPath="/calendar.svg"
			label="Spieltag"
			type="date"
		/>
		<Input
			requiredVal={true}
			bind:value={gameTime}
			name="gameTime"
			iconPath="/time.svg"
			label="Spielzeit"
			type="time"
		/>
		<Input
			requiredVal={true}
			bind:value={location} 
			label="Veranstaltungsort"
			data_by_id={locations_by_id}
			iconPath="/location.svg"
		/>
		{#if event_type === 'game'}
			<Input
				requiredVal={true}
				name="opponent"
				bind:value={opponent}
				label="Gegnerisches Team"
				iconPath="/team.svg"
				data_by_id={teams_by_id}
				bind:selectedId={my_id}
			/>
		{:else if event_type === 'tournament'}
			{#each teams as one_team, i}
				<Input
					requiredVal={i == 0}
					name="team{i}"
					bind:selectedId={teams[i]}
					label="Team {i + 1}"
					data_by_id={teams_by_id}
					iconPath="/team.svg"
				/>
			{/each}
			{#if teams[0] !== ''}
				<button on:click={new_team} type="button">Weiteres Team hinzufügen</button>
			{/if}
		{/if}
		<!-- <h1>{my_id}</h1> -->
		<!-- <input formaction="?/delete" type="submit" value="Delete" /> -->
		<Input type="submit" value="Veröffentlichen" />
	</form>
</div>

<style>
	input:checked ~ .radio {
		color: white !important;
		
	}
	.tabAnim {
		z-index: -9;
	}

	#game:checked ~ div {
		--tw-translate-x: 0%;
		color: white !important;
	}

	#tournament:checked ~ div {
		--tw-translate-x: 100%;
		color: white !important;
	}
</style>
