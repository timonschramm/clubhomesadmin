<script>
	export let ownTeam = '';
	export let opponentTeam = '';
	export let startingTime = '';
	export let event_id;

	let fullDate = new Date(startingTime);

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
			//show_sponsor = false;
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
			//show_sponsor = false;
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
					<h4>{ownTeam} vs {opponentTeam}</h4>
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
			<form  on:submit|preventDefault={approve_event} method="POST">
				<button class="iconButton approve">
					<img class="button-icon" src="/circle-checked-white.svg" alt="check" />
					Bestätigen
				</button>
			</form>
			<form  on:submit|preventDefault={cancel_event} method="POST">
				<button class="iconButton cancel">
					<img class="button-icon" src="/x-mark-white.svg" alt="check" />
					Absagen
				</button>
			</form>
			
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

	.game-date p,
	.game-time p {
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
	.iconButton {
		border: none;
		border-radius: 10px;
		display: flex;
		padding: 9px;
		align-items: center;
		margin-left: 10px;
		color: #fff;
	}
	.iconButton:hover{
		cursor: pointer;
	}
	
	.approve {
		background-color: #02BF01;
	}
	.cancel {
		background-color: #E20305;
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
