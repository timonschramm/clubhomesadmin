<script>
	export let ownTeam = '';
	export let opponentTeam = '';
	export let startingTime = '';
	export let event_id;
	export let cancelled = false;
	export let approved = false;
	export let event_type = "";

	let event_title = "";
	let fullDate = new Date(startingTime);

	if(event_type === "MATCH"){
		event_title = ownTeam + " vs " + opponentTeam;
	} 
	else if(event_type === "TOURNAMENT"){
		event_title = "Turnier: " + opponentTeam;
	}

	let date =
		('0' + fullDate.getDate()).slice(-2) +
		'.' +
		('0' + fullDate.getMonth()).slice(-2) +
		'.' +
		fullDate.getFullYear();
	let time =
		fullDate.getHours() +
		':' +
		'' +
		((fullDate.getMinutes() + '').length === 1
			? fullDate.getMinutes() + '0'		
			: fullDate.getMinutes());

	// for accordion
	import { slide } from 'svelte/transition';
	let isOpen = false;
	const toggle = () => (isOpen = !isOpen);
	const formdata = new FormData(this);
	formdata.append('event_id', event_id);
	async function approve_event() {
		const response = await fetch('?/approve_event', {
			method: 'POST',
			body: formdata
		});
		const result = await response.json();
		if (result.type === 'success') {
			console.log('Event approved!');
		}
	}
	async function cancel_event() {
		const response = await fetch('?/cancel_event', {
			method: 'POST',
			body: formdata
		});
		const result = await response.json();
		if (result.type === 'success') {
			console.log('Event canceled!');
		}
	}
	async function delete_event() {
		const response = await fetch('?/delete_event', {
			method: 'POST',
			body: formdata
		});
		const result = await response.json();
		if (result.type === 'success') {
			console.log('Event deleted!');
		}
	}
</script>

<div class="single-event">
	<div class="event-main">
		<div class="logoTitle">
			<div class="clubLogo">
				<img src="/cup.svg" alt="Opponents Club Logo" />
			</div>
			<div class="event-opponents">
				<div class="clubName">
					<h4>{event_title}</h4>
				</div>
				<div
					class="ml-4"
				>
					{#if cancelled}
						<img class="button-icon" src="/x-mark.svg" alt="check" />
					{:else if approved}
						<img class="button-icon" src="/circle-checked.svg" alt="check" />
					{/if}
			</div>
			</div>
		</div>
		<div class="event-details">
			<div class="game-date">
				<p>{date} - {time}</p>
			</div>
		</div>
	
		<div class="buttonContainer">
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
	</div>
	{#if isOpen}
		<div transition:slide={{ duration: 300 }} class="event-actions">
			<form class="mr-auto" on:submit|preventDefault={delete_event} method="POST">
				<button
					class="text-white flex bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-white-600 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
				>
					<img class="button-icon" src="/trash-white.svg" alt="check" />
					Löschen
				</button>
			</form>
			{#if !approved}
			<form on:submit|preventDefault={approve_event} method="POST">
				<button
					class="text-white flex bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
				>
					<img class="button-icon" src="/circle-checked-white.svg" alt="check" />
					Bestätigen
				</button>
			</form>
			{/if}
			<form on:submit|preventDefault={approve_event} method="POST">
				<button
					class="text-white flex bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:focus:ring-yellow-900"
				>
					<img class="button-icon" src="/x-mark-white.svg" alt="check" />
					Verschieben
				</button>
			</form>
			{#if !cancelled}
			<form on:submit|preventDefault={cancel_event} method="POST">
				<button
					class="text-white flex bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
				>
					<img class="button-icon" src="/x-mark-white.svg" alt="check" />
					Absagen
				</button>
			</form>
			{/if}
		</div>
	{/if}
</div>

<style>
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
		flex-direction: column;
		width: 100%;
	}

	.event-opponents {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.event-details {
		flex: 1;
	}
	.buttonContainer {
		display: flex;
		justify-content: flex-end;
		flex: 1;
	}

	.clubLogo {
		margin-right: 20px;
	}
	.logoTitle {
		display: flex;
		flex-direction: row;
	}

	.clubLogo img {
		width: 40px;
		object-fit: contain;
	}

	.game-date p {
		margin: 0;
		font-size: 14px;
		font-weight: bold;
		display: flex;
		align-items: center;
	}
	.game-date {
		margin-right: 20px;
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
		justify-content: flex-end;
	}

	.button-icon {
		width: 20px;
		margin-right: 10px;
	}

	@media (min-width: 768px) {
		.logoTitle {
			display: flex;
			flex: 3;
			flex-direction: row;
		}
		.event-main {
			display: flex;
			flex-direction: row;
			align-items: center;
			width: 100%;
		}
	}

	@media (min-width: 1024px) {
	}
</style>
