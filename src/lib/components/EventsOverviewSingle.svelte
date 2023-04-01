<script>
    export let ownTeam = "";
    export let opponentTeam = "";
    export let startingTime="";

    let fullDate = new Date(startingTime)

    let date = ("0" + fullDate.getDate()).slice(-2) + "." + ("0" + fullDate.getMonth()).slice(-2) + "." + fullDate.getFullYear()
    let time = fullDate.getHours() + ":" + "" + (((fullDate.getMinutes() + "").length === 1) ? (fullDate.getMinutes() + "0") : (fullDate.getMinutes())) 
	
    // for accordion
	import { slide } from 'svelte/transition';
	let isOpen = false;
	const toggle = () => (isOpen = !isOpen);
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
<style>
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
