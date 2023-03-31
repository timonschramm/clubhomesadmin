<script>
	export let allEvents;
    export let ownTeam = "";
	import EventsOverviewSingle from '$lib/components/EventsOverviewSingle.svelte';
</script>

<div id="calendar" class="calendar">
	<div class="calendar-heading">
		<h2>Eventübersicht</h2>
		<!--  <h2>Hallo User vom Team: {userTeam}</h2> -->
	</div>
	{#each allEvents as oneEvent}
		<EventsOverviewSingle
			{ownTeam}
			opponentTeam={oneEvent.name}
			startingTime={oneEvent.starts_at}
		/>
	{/each}
</div>

<style>
	.calendar {
		display: flex;
		flex: 1;
		flex-direction: column;
		width: 100%;
	}
</style>
