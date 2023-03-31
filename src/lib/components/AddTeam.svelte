<script lang="ts">
	import Input from '$lib/components/forms/Input.svelte';
    import { createEventDispatcher } from 'svelte';
    import { supabase } from '$lib/supabase';
	const dispatch = createEventDispatcher();

	let files: FileList;

	// Sportart
	// Geschlecht
	// Altersgruppe
	// Liga
	let url: string;
	let uploading = false;
	const uploadLogo = async () => {
        console.log("trying to upload")
		try {
			uploading = true;

			if (!files || files.length === 0) {
				throw new Error('You must select an image to upload.');
			}

			const file = files[0];
			const fileExt = file.name.split('.').pop();
			url = `${Math.random()}.${fileExt}`;

			let { error } = await supabase.storage.from('clubs/logos').upload(url, file);

			if (error) {
				throw error;
			}

			dispatch('upload');
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			uploading = false;
		}
	};
</script>

<div>
	<form action="?/createTeam" method="post">
		<Input label="Wie heißt dein Team?" />
		<Input name="sportArt" label="Welche Sportart übt dein Team aus?" />
		<Input name="geschlecht" type="radio" label="Wähle das Geschlecht des Teams: " />
		<Input name="altersgruppe" label="Altersgruppe" />
		<!-- 		<Input bind:files name="clubLogo" type="file" label="Lade euer Vereinslogo hoch" />
 -->
		<label class="button primary block" for="oneLogo">
			{uploading ? 'Uploading ...' : 'Upload'}
		</label>
		<input
			type="file"
			id="oneLogo"
			accept="image/*"
			bind:files
			on:change={uploadLogo}
			disabled={uploading}
		/>
		<input type="submit" value="Team erstellen" />
	</form>
</div>

<style>
</style>
