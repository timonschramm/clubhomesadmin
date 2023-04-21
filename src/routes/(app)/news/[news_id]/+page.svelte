<script lang="ts">
	import EditNews from '$lib/components/news/EditNews.svelte';
	import NewsSingle from '$lib/components/news/News_Single.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
	let news_image = "https://msnvudhxykflybyjkmft.supabase.co/storage/v1/object/public/news/"+ data.news_data.id +"/images/" + data.news_data.image_link;

	let heading = data.news_data.heading;
	import { marked } from 'marked';
	let url = '';
	import Input from '$lib/components/forms/Input.svelte';
	let source = data.news_data.content;
	$: markdown = marked(source);
	function clearForm() {
		source = '';
	}
	console.log(data.news_data.image_link)
</script>

<div class="edit-news-wrapper news flex w-full flex-row">
	<div class="fixed h-screen w-1/3 flex-col justify-center bg-gray-100 p-6 text-black">
		<div class="w-full">
			<a href="/dashboard">Zurück</a>
			<h3>Nachricht bearbeiten</h3>
			<form method="POST" action="?/update_news" enctype="multipart/form-data">
				<Input placeholder={data.news_data.heading} bind:value={heading} requiredVal={true} name="heading" label="Schlagzeile" />
				<p>Inhalt ihres Beitrags:</p>
				<div class="markdown-editor flex w-full flex-col">
					<div class="left-panel w-full">
						<textarea name="content" bind:value={source} class="source min-h-[300px] w-full" />
					</div>
					<div class="input">
						<button on:click={clearForm} type="button">Bisherigen Text loeschen</button>
					</div>
				</div>
				<Input
				bind:file={news_image}
					label="Beitragsbild wählen"
					bind:value={url}
					name="news_image"
					type="file"
					accept="image/*"
				/>
				<Input value="Speichern" type="submit" />
			</form>
		</div>
	</div>
	<div class="ml-[33.333%] flex w-2/3">
		<NewsSingle bind:news_image bind:heading bind:pContent={source} />
	</div>
</div>

<style>
	.markdown-editor {
		width: 100%;
		display: flex;
		align-items: flex-start;
		justify-content: space-evenly;
		margin-bottom: 20px;
	}
	.markdown-editor textarea {
		padding-top: 10px;
		padding-left: 10px;
	}

	.left-panel {
		width: 100%;
		overflow: hidden;
		flex-direction: row;
		margin-bottom: 10px;
	}
	.left-panel {
		border: solid 2px black;
		border-radius: 10px;
		height: 30vh;
	}

	.source {
		border: none;
		width: 100%;
		height: 100%;

		color: #000;
	}
	.source:focus {
		outline: none;
	}
	.output {
		width: 100%;
		padding: 0 2em;
	}
</style>
