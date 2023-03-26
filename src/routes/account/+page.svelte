<!-- src/routes/account/+page.svelte -->
<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import type { ActionData, PageData } from './$types';
	import { supabase } from '$lib/supabase';	
	import AutoCompleteInput from '$lib/components/AutoCompleteInput.svelte';
	import Input from '$lib/components/Input.svelte';
	export let data : PageData;
	import AddTeam from '$lib/components/AddTeam.svelte';
	console.log("Data vom Team")
	let teamName = "";
	let teamNotFound = false;
	console.log("Daten:")
	console.log(data.teamData)
	

	const submitValue = () => {
		if(teamName === ""){
			alert("Du hast kein Team angegeben!");
		}
		else if (!data.names.includes(teamName)) {
			alert('Create a new Team');
			teamNotFound = true;
		} else if (teamName) {
			console.log(`${teamName} is submitted!`);
			console.log(Object.keys(data.teamData).find(id => data.teamData[id] === teamName))

			setTimeout(teamName = "", 1000);
		} 
	};
</script>
<div class="standard-Wrapper"> 
	<div class="form-widget">
		<h1>Profil bearbeiten</h1>
		<div class="account-Wrapper">
			<form autocomplete="off" on:submit|preventDefault={submitValue}>
				<Input label="Dein Team" bind:value={teamName} bind:data={data.names} iconPath="team.svg"/>
			</form>
			{#if teamNotFound}
				<p>Das Teamn wurde nicht gefunden.</p>
				<p>Möchtest du ein neues erstellen?</p>
				
			{/if}
			<AddTeam />
		</div>
		<div class="logoutform">
			<form action="?/logout" method="POST" >
				<div>
					<input type="submit" value="Abmelden" />
				</div>
			</form>
		</div>
		
	</div>
</div>


