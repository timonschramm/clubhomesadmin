<script lang="ts">
	import Input from '$lib/components/forms/Input.svelte';
	import clubLogo from '$lib/assets/FC_Barcelona.png';
	import type { PageData } from './$types';
	export let data: PageData;
	let teamArr = Object.values(data.teamData);
	let locationArr = Object.values(data.locationData);
	console.log(locationArr)

	// for accordion
	import { slide } from 'svelte/transition';
	let isOpen = false;
	const toggle = () => (isOpen = !isOpen);
	let opponent = '';
	let gameDate = "";
	let gameTime = "";

	let userTeam = data.ownTeam;
</script>

<div class="standard-Wrapper">
	<div id="calendar" class="calendar">
		<div class="calendar-heading">
			<h2>Eventübersicht</h2>
			<h2>Hallo User vom Team: {userTeam}</h2>
		</div>
		<div class="single-event">
			<div class="event-main">
				<div class="logoTitle">
					<div class="clubLogo">
						<img src="/cup.svg" alt="Opponents Club Logo" />
					</div>
					<div class="event-opponents">
						<div class="clubName">
							<h4>FC Barcelona vs PSG</h4>
						</div>
					</div>
				</div>
				<div class="event-details">
					<div class="game-date">
						<p>03. March 2022</p>
					</div>
					<div class="game-time">
						<p>7:30 PM</p>
					</div>
				</div>
				<button class="toggleButton" on:click={toggle} aria-expanded={isOpen}>
					<svg
						style="tran"
						width="20"
						height="20"
						fill="none"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						viewBox="0 0 24 24"
						stroke="currentColor"><path d="M9 5l7 7-7 7" /></svg
					>
					Bearbeiten
				</button>
			</div>
			{#if isOpen}
				<div transition:slide={{ duration: 300 }} class="event-actions">
					<button class="iconButton">
						<img class="button-icon" src="/circle-checked.svg" alt="check" />
						Bestätigen
					</button>
					<button class="iconButton">
						<img class="button-icon" src="/x-mark.svg" alt="check" />
						Absagen
					</button>
				</div>
			{/if}
		</div>
	</div>
	<div>
		<h3>Neues Event</h3>
		<form action="createEvent" method="POST">
			<Input bind:value={opponent} label="Gegnerisches Team" data={teamArr} iconPath="/team.svg" />
			<Input
				bind:value={opponent}
				label="Veranstaltungsort"
				data={locationArr}
				iconPath="/location.svg"
			/>
			<Input bind:value={gameDate} name="gameDay" iconPath="/calendar.svg" label="Spieltag" type="date" />
			<Input bind:value={gameTime} name="gameTime" iconPath="/time.svg" label="Spielzeit" type="time" />
			<input formaction="?/delete" type="submit" value="Delete" />
			<input formaction="?/createEvent" type="submit" value="Veröffentlichen" />
		</form>
	</div>
</div>

<style>
	.standard-Wrapper {
		display: flex;
		flex-direction: column;
	}
	.calendar {
		display: flex;
		flex: 1;
		flex-direction: column;
		width: 100%;
	}

	.logoTitle {
		display: flex;
		flex-direction: row;
	}

	.single-event {
		padding: 10px 20px 10px 20px;
		display: flex;
		width: 100%;
		align-items: center;
		justify-content: space-between;
		border-radius: 10px;
		margin-bottom: 20px;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
		flex-direction: column;
	}
	.event-main {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		width: 100%;
	}

	.event-opponents {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.event-details {
		display: flex;
	}

	.clubLogo {
		display: flex;
		margin-right: 20px;
	}

	.clubLogo img {
		width: 40px;
		object-fit: contain;
	}

	.game-date p,
	.game-time p {
		margin: 0;
		font-size: 14px;
		font-weight: bold;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.toggleButton {
		display: flex;
		align-items: center;
		border: none;
		background: none;
		cursor: pointer;
		margin: 0;
		padding-bottom: 0.5em;
		padding-top: 0.5em;
	}

	svg {
		transition: transform 0.2s ease-in;
	}

	[aria-expanded='true'] svg {
		transform: rotate(0.25turn);
	}
	.event-actions {
		margin-top: 20px;
		display: flex;
		flex-direction: row;
		width: 100%;
		align-items: center;
	}
	.iconButton {
		border-radius: 10px;
		display: flex;
		padding: 5px;
		align-items: center;
		margin-right: 10px;
	}

	.button-icon {
		width: 20px;
		margin-right: 10px;
	}
</style>
