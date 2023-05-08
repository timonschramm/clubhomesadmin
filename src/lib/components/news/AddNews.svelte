<script language="ts">
	import { marked } from 'marked';
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
	function clearForm(){
		source="";
	}
</script>

<div class="add_news_wrapper">
	<h3>Neue Nachricht erstellen</h3>
	<form method="POST" action="?/create_news" enctype="multipart/form-data">
		<Input  requiredVal={true}  name="heading" label="Schlagzeile" />
		<p>Inhalt ihres Beitrags:</p>
		<div class="markdown-editor">
			<div class="left-part">
				<div class="left-panel">
					<textarea name="content" bind:value={source} class="source" />
				</div>
				<div class="input">
					<button on:click={clearForm} type="button">Bisherigen Text loeschen</button>
				</div>
				
			</div>
			
			
			
			
			<div class="right-panel">
				<div class="output">{@html markdown}</div>
			</div>
		</div>
		<Input bind:value={url} name="news_image" type="file" accept="image/*" />
		<Input value="Nachricht erstellen" type="submit" />
		
	</form>
</div>

<style>
	.add_news_wrapper {
	}
	.markdown-editor {
		width: 100%;
		display: flex;
		align-items: flex-start;
		justify-content: space-evenly;
		margin-bottom: 20px;
	}
	.markdown-editor textarea{
		padding-top: 10px;
		padding-left: 10px;
	}
	.left-part{
		width: 50%;
	}
	.left-panel {
		width: 100%;
		overflow: hidden;
		flex-direction: row;
		margin-bottom: 10px;
	}
	.left-panel,
	.right-panel {
		border: solid 2px black;
		border-radius: 10px;
		height: 30vh;
	}
	.right-panel {
		width: 50%;
		border-radius: 10px;
		border: 2px solid #000;
	}
	.right-panel .output {
		
		height: 29vh;
		overflow: auto;
		border-radius: 8px;
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
