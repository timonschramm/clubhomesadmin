<script>
	const cdn_url = 'https://msnvudhxykflybyjkmft.supabase.co/storage/v1/object/public/sponsors/';
	import SponsorOverviewSingle from '$lib/components/SponsorOverviewSingle.svelte';
    console.log()
	export let sponsor_data = [];
</script>

<div>
	<h2>Unsere Sponsoren</h2>
	<div class="sponsorOverview-Wrapper">
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
