<script lang="ts">
	import { marked } from 'marked';

	export let heading = '';
	export let image_path = '';
	export let publish_time = 0;
	export let content = '';
	export let news_id;
	let url = '';

	const cdn_url = 'https://msnvudhxykflybyjkmft.supabase.co/storage/v1/object/public/news/';

	$: markdown = marked(content);
	if (image_path === "") {
		image_path = '/news.jpg';
	}
    else{
        image_path = cdn_url + news_id + '/images/' + image_path;
    }
	const options: Intl.DateTimeFormatOptions = {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		//hour: 'numeric',
		//minute: 'numeric',
		hour12: false,
		timeZone: 'Europe/Berlin'
	};

	const formatter = new Intl.DateTimeFormat('de-DE', options);
</script>

<div>
	<a href={url} class="news-Main">
		<div class="news-single-image">
			<img src={image_path} alt="newsImage" />
		</div>
		<div class="news-single-area">
			<div class="news-single-heading">
				<h4>{heading}</h4>
			</div>
			<div class="news-single-details">
				<div class="pubTime">
					<div class="pubTimeIcon">
						<img src="/time.svg" alt="clock icon" />
					</div>
					<span class="pubTime">{formatter.format(new Date(publish_time))}</span>
				</div>
				<div class="tags">
					<span class="news-tag">Fußball</span>
				</div>
			</div>
			<div class="news-content">
				{@html markdown}
			</div>
		</div>
	</a>
</div>

<style>
	a {
		color: black;
	}
	.news-Main {
		display: flex;
		flex-direction: row;
		border-radius: 10px;
		margin-bottom: 25px;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
		padding: 10px;
		/*  height: 100px; */
	}
	.news-single-image {
		display: flex;
		align-content: center;
		justify-content: center;
		width: 35%;
	}
	.news-single-image img {
		width: 100%;
		border-radius: 15px;
	}

	.news-single-area {
		display: flex;
		width: 65%;
		padding-left: 1rem;
		flex-direction: column;
		justify-content: space-between;
	}
	.news-single-heading h4 {
		font-weight: bold;
	}
	.news-single-details {
		display: flex;
		flex-direction: column;
	}
	.news-single-details .pubTime,
	.news-single-details .tags span {
		font-size: 13px !important;
	}

	.news-tag {
		color: red;
		padding-right: 10px;
		text-transform: uppercase;
		font-weight: bold;
	}
	.pubTimeIcon {
		width: 15px;
		margin-right: 5px;
		display: flex;
	}
	.pubTime {
		color: #5669ff;
		display: flex;
		font-weight: bold;
	}
	.pubTimeIcon svg {
		color: #5669ff;
	}
	@media (min-width: 600px) {
		/* .news-Wrapper {
            margin-right: 2%;
        }
        .news-Main{
            display: flex;
            flex-direction: column;
            padding: 0px;
        }
        .news-Container {
            display: flex;
            flex-wrap: wrap;
            column-gap: 3%;
        }

       
        .news-Container > a{
           width: 48.5%;
        }

        .news-single-image{
            display: flex;
            width: 100%;
        }
        
        .news-single-details {
            display: flex;
            flex-direction: row;
            width: 100%;
            justify-content: space-between;
            align-items: center;
        }
        .news-single-area{
            width: 100%;
            padding: 10px
        } */
	}
	@media (min-width: 768px) {
	}

	@media (min-width: 1024px) {
	}
	@media (min-width: 1366px) {
	}
	@media (min-width: 1920px) {
	}
	@media (min-width: 2560px) {
	}
</style>
