<script>
	import Input from '$lib/components/forms/Input.svelte';
    export let file;
    let url_start = ""
</script>

<div>
	<p>Sie haben bereits ihr Satzung hochgeladen</p>
	<p>Wenn Sie eine neue Satzung hochladen möchten, wird die alte überschrieben</p>
	<a
		class="btn btn-blue"
		href="https://msnvudhxykflybyjkmft.supabase.co/storage/v1/object/public/clubs/57a9109e-85f9-4862-b502-514bff9aef36/satzung/5817364f-71ac-4ff3-b754-e8d7575a6ccf.pdf"
		>Satzung anschauen</a
	>

	<h3>Satzung hochladen</h3>
	<form action="?/create_satzung" method="POST" enctype="multipart/form-data">
		<Input name="satzung" type="file" />
		<Input type="submit" value="Satzung hochladen" />
	</form>
</div>
