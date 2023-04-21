<script lang="ts">
	import Input from '$lib/components/forms/Input.svelte';
	let url: string;
	let sponsor_name = '';
	export let existing_sponsors;
	export let sponsors_except_existing;
	let sponsor_arr = sponsors_except_existing.map((one_sponsor) => one_sponsor.name);

	async function submitValue() {
		const formdata = new FormData(this);
		if (!sponsor_arr.includes(sponsor_name)) {
			console.log('Neuen Sponsor erstellen!');
			const response = await fetch('?/create_new_sponsor', {
				method: 'POST',
				body: formdata
			});
			const result = await response.json();

			if (result.type === 'success') {
				console.log('Neuer Sponsor erstellt!');
			}
		} else {
			console.log('Bestehenden hinzufügen!');
			let val = sponsors_except_existing.filter(
				(one_sponsor) => one_sponsor.name === sponsor_name
			);
			console.log(val[0].sponsor_teams[0])
			console.log(val[0].sponsor_teams[0].sponsor_id)
			console.log(val[0].id);
			formdata.append('sponsor_id', val[0].id);
			const response = await fetch('?/add_existing_sponsor', {
				method: 'POST',
				body: formdata
			});
		}
		//TODO -- better solution
		//location.reload();
	}
	let create_new_bool = false;
	$: {
		//console.log('true? ', !sponsor_arr.includes(sponsor_name));
		create_new_bool = sponsor_name === '' ? false : !sponsor_arr.includes(sponsor_name);
	}
</script>

<div>
	<h3>Sponsor hinzufügen</h3>
	<form
		on:submit|preventDefault={submitValue}
		method="POST"
		autocomplete="off"
		action="?/create_new_sponsor"
		enctype="multipart/form-data"
	>
		<Input bind:value={sponsor_name} data_by_id={sponsors_except_existing} name="sponsor_name" label="Sponsorname" />
		{#if create_new_bool}
			<Input label="Logo des Sponsors hochladen" bind:value={url} name="sponsorLogo" type="file" accept="image/*"/>
		{/if}
		<Input type="submit" value="Sponsor erstellen" />
	</form>
</div>

<style>
</style>
