<script>
	import EditNews from '$lib/components/EditNews.svelte';
	import NewsSingle from '$lib/components/News_Single.svelte';

	let heading = '';
	import { marked } from 'marked';
	import '../../styles.css';
	let url = '';
	import Input from '$lib/components/forms/Input.svelte';
	let source = `
# H1 

## H2 heading

### H3 heading

--------

**bold text**

*italicized text*

--------

1. First item
2. Second item
3. Third item

- First item
- Second item
- Third item

[Svelte](https://svelte.dev/)
`;
	$: markdown = marked(source);
	function clearForm() {
		source = '';
	}
</script>

<div class="edit-news-wrapper flex w-full flex-row news">
	<div class="w-1/3 bg-gray-100 h-screen flex-col p-6 fixed text-black justify-center">
		
		<div class="w-full">
			<a href="/dashboard">Zurück</a>
			<h3>Neue Nachricht erstellen</h3>
			<form method="POST" action="?/create_news" enctype="multipart/form-data">
				<Input bind:value={heading} requiredVal={true} name="heading" label="Schlagzeile" />
				<p>Inhalt ihres Beitrags:</p>
				<div class="markdown-editor w-full flex flex-col">
					<div class="left-panel w-full">
						<textarea name="content" bind:value={source} class="source w-full min-h-[300px]" />
					</div>
					<div class="input">
						<button on:click={clearForm} type="button">Bisherigen Text loeschen</button>
					</div>
				</div>
				<Input label="Beitragsbild wählen" bind:value={url} name="news_image" type="file" accept="image/*" />
				<Input value="Nachricht erstellen" type="submit" />
			</form>
		</div>
	</div>
	<div class="flex w-2/3 ml-[33.333%]">
		<NewsSingle bind:heading bind:pContent={source} />
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
