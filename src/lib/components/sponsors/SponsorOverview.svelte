<script>
	const cdn_url = 'https://msnvudhxykflybyjkmft.supabase.co/storage/v1/object/public/sponsors/';
	import SponsorOverviewSingle from '$lib/components/sponsors/SponsorOverviewSingle.svelte';
	import FoundNothing from '../FoundNothing.svelte';
    console.log()
	export let sponsor_data = [];
</script>

<div id="sponsoren">
	<h2>Unsere Sponsoren</h2>
	<div class="sponsorOverview-Wrapper">
		{#if sponsor_data.length === 0}
			<FoundNothing text="Es gibt noch keine Sponsoren"/>
		{/if}
		{#each sponsor_data as oneSponsor}
			<SponsorOverviewSingle
				sponsor_id={oneSponsor.sponsor_id}
				sponsorname={oneSponsor.sponsors.name}
				image_link={cdn_url + oneSponsor.sponsor_id + '/logo/' + oneSponsor.sponsors.logo_link}
			/>
		{/each}
	</div>
</div>

<style>
	.sponsorOverview-Wrapper {
		display: grid;
		flex-direction: column;
		gap: 20px;
		margin-bottom: 30px;
	}
</style>
