<script lang="ts">
	import Input from '$lib/components/forms/Input.svelte';
	let url: string;
</script>

<div>
	<h3>Sponsor hinzufügen</h3>
	<form action="?/createSponsor" method="post" enctype="multipart/form-data">
		<Input name="sponsor_name" label="Sponsorname" />
		<Input bind:value={url} name="sponsorLogo" type="file" accept="image/*" />
		<Input type="submit" value="Sponsor erstellen" />
	</form>
</div>

<style>
	
</style>
