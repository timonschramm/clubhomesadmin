<script lang="ts">
	import EventsOverview from '$lib/components/EventsOverview.svelte';
	import type { PageData } from './$types';
	import AddEvent from '$lib/components/AddEvent.svelte';
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
</div>

<style>
	.standard-Wrapper {
		display: flex;
		flex-direction: column;
	}
</style>
