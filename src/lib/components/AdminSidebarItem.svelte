<script>
	export let link = '';
	export let text = '';
	export let svg_form = '';
	export let notifications = false;
</script>

<li>
    
	<a
		href={link}
		class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
	>
		<img
			class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
			src={svg_form}
			alt="share"
		/>
		<span class="flex-1 ml-3 whitespace-nowrap">{text}</span>
		{#if notifications}
			<span
				class="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300"
				>3</span
			>
		{/if}
	</a>
</li>

<style>
	svg.arrow {
		transform: rotate(-0.25turn);
	}
	[aria-expanded='true'] svg.arrow {
		transform: rotate(0turn);
	}
</style>
