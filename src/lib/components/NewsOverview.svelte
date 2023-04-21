<script>
	import NewsOverviewSingle from '$lib/components/NewsOverviewSingle.svelte';
	import FoundNothing from './FoundNothing.svelte';
	export let news;
	const cdn_url = 'https://msnvudhxykflybyjkmft.supabase.co/storage/v1/object/public/news/';
</script>

<div id="news">
	<h2>Unsere News</h2>
	<div class="newsOverview-Wrapper">
		{#if news.length === 0}
			<FoundNothing text="Es gibt noch keine News"/>
		{/if}
		{#each news as one_news}
			<NewsOverviewSingle
				heading={one_news.heading}
				news_id={one_news.id}
				image_path={one_news.image_link}
				publish_time={one_news.created_at}
				content={one_news.content}
			/>
		{/each}
	</div>
</div>

<style>
	.nonews {
		display: flex;
		padding: 10px 20px 10px 20px;
		width: 100%;
		align-items: center;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
		border-radius: 10px;
	}
</style>
