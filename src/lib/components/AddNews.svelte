<script language="ts">
	import { marked } from 'marked';

	import Input from '$lib/components/forms/Input.svelte';
	let source = `
# H1 heading

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
</script>

<div class="add_news_wrapper">
	<h3>Neue Nachricht erstellen</h3>
	<form method="POST" action="?/create_news">
		<Input name="heading" label="Schlagzeile" />
		<p>Inhalt ihres Beitrags:</p>
		<div class="markdown-editor">
			<div class="left-panel">
				<textarea bind:value={source} class="source" />
			</div>

			<div class="right-panel">
				<div class="output">{@html markdown}</div>
			</div>
		</div>
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
	.left-panel,
	.right-panel {
		width: 50%;
		border: solid 1px black;
		height: 30vh;
		background: #ffffff;
	}
	.right-panel {
		overflow: auto;
	}
	.source {
		border: none;
		width: 100%;
		height: 100%;
		background: #001628;
		color: #83ba52;
	}
	.source:focus {
		outline: none;
	}
	.output {
		width: 100%;
		padding: 0 2em;
	}
</style>
