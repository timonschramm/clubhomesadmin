<!-- src/routes/account/+page.svelte -->
<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import type { ActionData, PageData } from './$types';
	import { supabase } from '$lib/supabase';
	import AutoCompleteInput from '$lib/components/forms/AutoCompleteInput.svelte';
	import Input from '$lib/components/forms/Input.svelte';
	export let data: PageData;
	import AddTeam from '$lib/components/AddTeam.svelte';
	let teamName = '';
	let teamNotFound = false;
	let teamArr = Object.values(data.teamData);
	/* console.log("Daten:")
	console.log(data.teamData) */

	//https://dev.to/theether0/sveltekit-changes-form-actions-and-progressive-enhancement-31h9
	async function submitValue(event) {
		const formdata = new FormData(this);
		const response = await fetch('?/updateUser', {
			method: 'POST',
			body: formdata
		});
		const result = await response.json();

		if (result.type === 'success') {
			// re-run all `load` functions, following the successful update
			//await invalidateAll();
			console.log('Team umgestellt!');
		}

		if (teamName === '') {
			alert('Du hast kein Team angegeben!');
		} else if (!teamArr.includes(teamName)) {
			alert('Create a new Team');
			teamNotFound = true;
		} else if (teamName) {
			console.log(`${teamName} is submitted!`);
			console.log(Object.keys(data.teamData).find((id) => data.teamData[id] === teamName));
			setTimeout((teamName = ''), 1000);
			teamNotFound = false;
		}
	}
</script>

<div class="standard-Wrapper">
	<div class="form-widget">
		<h1>Profil bearbeiten</h1>
		<div class="account-Wrapper">
			<form
				on:submit|preventDefault={submitValue}
				method="POST"
				autocomplete="off"
			>
				<!-- 	<form action="?/updateUser" method="POST" autocomplete="off" on:submit|preventDefault={submitValue}> -->
				<Input
					name="team"
					label="Dein Team"
					bind:value={teamName}
					bind:data={teamArr}
					iconPath="team.svg"
				/>
				<input type="submit" value="Speichern" />
			</form>
			{#if teamNotFound}
				<p>Das Teamn wurde nicht gefunden.</p>
				<p>Möchtest du ein neues erstellen?</p>
			{/if}
			<AddTeam />
		</div>
		<div class="logoutform">
			<form action="?/logout" method="POST">
				<div>
					<input type="submit" value="Abmelden" />
				</div>
			</form>
		</div>
	</div>
</div>
