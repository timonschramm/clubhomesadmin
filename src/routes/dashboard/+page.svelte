<script lang="ts">
	import EventsOverview from '$lib/components/EventsOverview.svelte';
	import type { PageData } from './$types';
	import AddEvent from '$lib/components/AddEvent.svelte';
	import SponsorOverview from '$lib/components/SponsorOverview.svelte';
	import AddSponsor from '$lib/components/AddSponsor.svelte';
	import NewsOverview from '$lib/components/NewsOverview.svelte';
	import AddNews from '$lib/components/AddNews.svelte';
	export let data: PageData;

	let userTeam = data.ownTeam;
	let allEvents = data.eventData;

	let teamArr = Object.values(data.teamData);
	let locationArr = Object.values(data.locationData);
	let opponent = '';
	let gameDate = '';
	let gameTime = '';
</script>

<div class="standard-Wrapper">
	<EventsOverview ownTeam={userTeam} {allEvents} />
	<AddEvent bind:opponent bind:gameDate bind:gameTime {teamArr} {locationArr} />
	<SponsorOverview sponsor_data={data.all_existing_sponsors}/>
	<AddSponsor existing_sponsors={data.all_existing_sponsors} sponsors_except_existing={data.all_sponsors_except_existing}/>
	<NewsOverview/>
	<AddNews/>
</div>

<style>
	.standard-Wrapper {
		display: flex;
		flex-direction: column;
	}
</style>
