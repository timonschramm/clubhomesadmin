<script>
	import NewsOverviewSingle from '$lib/components/NewsOverviewSingle.svelte';
	export let news;
	const cdn_url = 'https://msnvudhxykflybyjkmft.supabase.co/storage/v1/object/public/news/';
</script>


<div>
	<h2>News Overview</h2>
	<div class="newsOverview-Wrapper">
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