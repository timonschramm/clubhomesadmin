<script lang="ts">
	import Input from '$lib/components/forms/Input.svelte';
	import { createEventDispatcher } from 'svelte';
	import { supabase } from '$lib/supabase';
	const dispatch = createEventDispatcher();

	// Sportart
	// Geschlecht
	// Altersgruppe
	// Liga
	let url: string;
</script>

<div>
	<form action="?/createTeam" method="post" enctype="multipart/form-data">
		<Input name="teamName" label="Wie heißt dein Team?" />
		<Input name="sportArt" label="Welche Sportart übt dein Team aus?" />
		<Input name="geschlecht" type="radio" label="Wähle das Geschlecht des Teams: " />
		<Input name="altersgruppe" label="Altersgruppe" />


		<input name="truePath" bind:value={url} hidden />
		<Input label="Liga des Teams"/>
		<Input label="Vereinslogo hochladen" bind:value={url} name="teamLogoPath" type="file" accept="image/*" />
		<Input type="submit" value="Team erstellen" />
	</form>
</div>

<style>
</style>
