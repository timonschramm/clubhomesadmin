<script>
	export let allEvents;
	export let ownTeam = '';
	import EventsOverviewSingle from '$lib/components/events/EventsOverviewSingle.svelte';
</script>

<div id="calendar" class="calendar">
	<div class="calendar-heading">
		<h2>Eventübersicht</h2>
	</div>
	<div class="eventOverview-Wrapper">
		{#if allEvents}
			{#each allEvents as oneEvent}
				<EventsOverviewSingle
					event_id={oneEvent.id}
					{ownTeam}
					opponentTeam={oneEvent.name}
					startingTime={oneEvent.starts_at}
					event_type={oneEvent.event_categories.sub}
					cancelled={oneEvent.cancelled}
					approved={oneEvent.confirmed}
				/>
			{/each}
		{:else}
			<p>Keine Events gefunden</p>
		{/if}
	</div>
</div>

<style>
	.calendar {
		display: flex;
		flex: 1;
		flex-direction: column;
		width: 100%;
	}
	.eventOverview-Wrapper {
		display: grid;
		flex-direction: column;
	}
</style>
