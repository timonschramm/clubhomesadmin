<script>
	import Input from '$lib/components/forms/Input.svelte';
	export let opponent = '';
	export let location = '';
	export let gameDate = '';
	export let gameTime = '';
	export let teamArr = [];
	export let locationArr = [];
	export let teams_by_id = {};
    let my_id = "";
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
        if(event_type === "tournament"){
            formdata.append('teams', JSON.stringify(teams));
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
	<div class="border-solid border-4 w-fit border-blue-500 mb-3 rounded-xl">
		<div class="inline-flex rounded-lg ">
			<input
				bind:group={event_type}
				type="radio"
				name="event_type"
				id="game"
				checked
				hidden
				value={'game'}
			/>
			<label for="game" class="radio text-center self-center py-1 px-3 cursor-pointer  text-md"
				>Spiel</label
			>
		</div>
		<div class="inline-flex rounded-lg">
			<input
				bind:group={event_type}
				type="radio"
				name="event_type"
				id="tournament"
				hidden
				value={'tournament'}
			/>
			<label for="tournament" class="radio text-center self-center py-1 px-3 cursor-pointer text-md"
				>Turnier</label
			>
		</div>
	</div>

	<form on:submit|preventDefault={create_event} method="POST">
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
			data={locationArr}
			iconPath="/location.svg"
		/>
		{#if event_type == 'game'}
			<Input
				requiredVal={true}
				name="opponent"
				bind:value={opponent}
				label="Gegnerisches Team"
				data={teamArr}
				iconPath="/team.svg"
                data_by_id={teams_by_id}
                bind:selectedId={my_id}
			/>
		{:else if event_type == 'tournament'}
			{#each teams as one_team, i}
				<Input
                
					requiredVal={(i == 0)}
					name="team{i}"
					bind:value={teams[i]}
					label="Team {i + 1}"
					data={teamArr}
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
		color: white;
		background-color: #0095f6;
	}
</style>
