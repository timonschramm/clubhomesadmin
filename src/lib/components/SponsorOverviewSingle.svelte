<script>
	export let sponsorname = '';
	export let sponsor_id = '';
	export let image_link = '';

	// for accordion
	import { slide } from 'svelte/transition';
	let isOpen = false;
	let show_sponsor = true;
	const toggle = () => (isOpen = !isOpen);

	async function delete_team() {
		const formdata = new FormData(this);
		formdata.append('sponsor_id', sponsor_id);
		const response = await fetch('?/delete_sponsor', {
			method: 'POST',
			body: formdata
		});
		const result = await response.json();
		if (result.type === 'success') {
			console.log('Sponsor gelöscht!');
			show_sponsor = false;
		}
	}
</script>

{#if show_sponsor}
	<div class="single-sponsor">
		<div class="sponsorlogo">
			<img src={image_link} alt="sponsor logo" />
		</div>
		<div class="sponsorname">
			<h4>{sponsorname}</h4>
		</div>

		<div class="event-actions">
			<form on:submit|preventDefault={delete_team} method="POST">
				<button formaction="?/delete_sponsor" class="iconButton cancel">
					<img class="button-icon" src="/x-mark-white.svg" alt="check" />
					Löschen
				</button>
			</form>
		</div>
	</div>
{/if}

<style>
	.single-sponsor {
		display: flex;
		padding: 10px 20px 10px 20px;
		width: 100%;
		align-items: center;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
		border-radius: 10px;
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
	.event-actions {
		display: flex;
		align-items: flex-end;
		justify-content: flex-end;
		flex: 1;
	}
	.iconButton:hover {
		cursor: pointer;
	}
	.sponsorlogo {
		margin-right: 20px;
	}
	.sponsorlogo img {
		height: 50px;
	}
	.button-icon {
		width: 20px;
		margin-right: 10px;
	}

	.cancel {
		background-color: #e20305;
	}
</style>
