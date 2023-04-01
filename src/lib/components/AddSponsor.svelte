<script lang="ts">
	import Input from '$lib/components/forms/Input.svelte';
	let url: string;
</script>

<div>
	<form action="?/createSponsor" method="post" enctype="multipart/form-data">
		<Input label="Sponsorname" />
		<Input bind:value={url} name="sponsorLogo" type="file" accept="image/*" />
		<Input type="submit" value="Sponsor erstellen" />
	</form>
</div>

<style>
	
</style>
