<script>
	import Input from '$lib/components/forms/Input.svelte';
	import AddTeam from '$lib/components/AddTeam.svelte';
	export let teamName = '';
	export let teams_by_id;
	let teamNotFound = false;
	let team_id;
	console.log(teams_by_id);

	//https://dev.to/theether0/sveltekit-changes-form-actions-and-progressive-enhancement-31h9
	async function submitValue(event) {
		const formdata = new FormData(this);

		if (teamName === '') {
			alert('Du hast kein Team angegeben!');
		} else if (!Object.keys(teams_by_id).includes(team_id)) {
			alert('Dein Team exisitiert noch nicht. Erstelle ein neues.');
			teamNotFound = true;
		} else if (teamName) {
			const response = await fetch('?/pic_team', {
				method: 'POST',
				body: formdata
			});
			const result = await response.json();
			console.log(`${teamName} is submitted!`);
			console.log(Object.keys(teams_by_id).find((id) => id === team_id));
			teamNotFound = false;
			if (result.type === 'redirect') {
				console.log(result);
				console.log('loc', result.location);
				teamNotFound = false;
				window.location.href = result.location;
			}
		}
	}
</script>

<div class="account-Wrapper">
	<form on:submit|preventDefault={submitValue} method="POST" autocomplete="off">
		<!-- 	<form action="?/updateUser" method="POST" autocomplete="off" on:submit|preventDefault={submitValue}> -->
		<Input
			name="team"
			label="Dein Team"
			bind:value={teamName}
			bind:data_by_id={teams_by_id}
			bind:selectedId={team_id}
			iconPath="team.svg"
		/>
		{#if teamNotFound}
			<p class="text-red-500 text-sm mt-2 mb-3">Das Teamn wurde nicht gefunden.</p>
		{/if}
		<Input type="submit" value="Speichern" />
	</form>
	{#if teamNotFound}
		<h2
			class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-dark"
		>
			Neues Team erstellen
		</h2>
		<AddTeam />
	{/if}
</div>
