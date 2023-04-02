<script>
	import SponsorOverviewSingle from '$lib/components/SponsorOverviewSingle.svelte';
	export let sponsorLogoPaths = [];
</script>

<div>
	<h2>Unsere Sponsoren</h2>
	<div class="sponsorOverview-Wrapper">
		{#each sponsorLogoPaths as oneSponsor}
			<SponsorOverviewSingle image_link={oneSponsor} />
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
