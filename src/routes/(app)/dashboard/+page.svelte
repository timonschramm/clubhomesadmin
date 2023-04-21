<script lang="ts">
	import EventsOverview from '$lib/components/events/EventsOverview.svelte';
	import type { PageData } from './$types';
	import AddEvent from '$lib/components/events/AddEvent.svelte';
	import SponsorOverview from '$lib/components/sponsors/SponsorOverview.svelte';
	import AddSponsor from '$lib/components/sponsors/AddSponsor.svelte';
	import NewsOverview from '$lib/components/news/NewsOverview.svelte';
	import AddNews from '$lib/components/news/AddNews.svelte';
	import AddSocials from '$lib/components/AddSocials.svelte';
	export let data: PageData;

	let userTeam = data.ownTeam;
	let allEvents = data.eventData;

	let teamArr = data.teamData ? Object.values(data.teamData) : [];
	let locationArr = data.locationData ? Object.values(data.locationData) : [];
	let opponent = '';
	let gameDate = '';
	let gameTime = '';
</script>

<div class="standard-Wrapper">
	<EventsOverview ownTeam={userTeam} {allEvents} />
	<AddEvent
		bind:opponent
		bind:gameDate
		bind:gameTime
		teams_by_id={data.teamData}
		locations_by_id={data.locationData}

	/>
	<SponsorOverview sponsor_data={data.existing_sponsors ? data.existing_sponsors : []} />
	<AddSponsor
		existing_sponsors={data.existing_sponsors ? data.existing_sponsors : []}
		sponsors_except_existing={data.all_sponsors_except_existing}
	/>
	<NewsOverview news={data.news ? data.news : []} />
	
	<div />
	<a href="/edit-news" class="btn btn-blue">Neue News</a>
	<AddSocials />
</div>

<style>
	.standard-Wrapper {
		display: flex;
		flex-direction: column;
	}
	.btn {
		@apply font-bold py-1 px-4 rounded mt-4 align-middle text-center;
	}
	.btn-blue {
		@apply bg-blue-500 text-white;
	}
	.btn-blue:hover {
		@apply bg-blue-700;
	}
</style>
