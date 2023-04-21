<script>
    export let show_dashboard_dropdwon;
	export let text = '';
</script>

<button
	on:click={() => (show_dashboard_dropdwon = !show_dashboard_dropdwon)}
	aria-expanded={show_dashboard_dropdwon}
	type="button"
	class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
	aria-controls="dropdown-example"
	data-collapse-toggle="dropdown-example"
>
	<svg
		aria-hidden="true"
		class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
		fill="currentColor"
		viewBox="0 0 20 20"
		xmlns="http://www.w3.org/2000/svg"
		><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" /><path
			d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"
		/></svg
	>
	<span class="flex-1 ml-3 text-left whitespace-nowrap">{text}</span>
	<svg
		class="arrow w-6 h-6"
		fill="currentColor"
		viewBox="0 0 20 20"
		xmlns="http://www.w3.org/2000/svg"
		><path
			fill-rule="evenodd"
			d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
			clip-rule="evenodd"
		/></svg
	>
</button>
<style>
    svg.arrow {
        transform: rotate(-0.25turn);
    }
	[aria-expanded='true'] svg.arrow {
		transform: rotate(0turn);
	}
</style>
