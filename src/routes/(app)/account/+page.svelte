<!-- src/routes/account/+page.svelte -->
<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import type { ActionData, PageData } from './$types';
	export let data: PageData;
	import AddTeam from '$lib/components/AddTeam.svelte';
	import EditTeam from '$lib/components/EditTeam.svelte';
	let teamName = data.ownTeam;
	let teamNotFound = false;
	let teamArr = Object.values(data.teamData);
	

	//https://dev.to/theether0/sveltekit-changes-form-actions-and-progressive-enhancement-31h9
	async function submitValue(event) {
		const formdata = new FormData(this);
		const response = await fetch('?/updateUser', {
			method: 'POST',
			body: formdata
		});
		const result = await response.json();

		if (result.type === 'success') {
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
			teamNotFound = false;
		}
	}
</script>

<div class="standard-Wrapper">
	<div class="form-widget">
		<h1>Team bearbeiten</h1>	
		<EditTeam/>
	</div>
</div>
