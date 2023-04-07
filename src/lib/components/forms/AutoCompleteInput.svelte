<script>
	export let name = '';
	export let placeholder = '';
	export let value = '';
	export let data = [];
	export let data_by_id = {};
	import AutoCompleteInputElement from '$lib/components/forms/AutoCompleteInputElement.svelte';
	let filteredElements = [];
	let filtered_data = {};
	let showing_off = false;
	let special_val = '';
	export let selectedId;

	export let showNotice;
	//console.log('databyid', data_by_id);
/* 	for (const key in data_by_id) {
		// do something with the key
		console.log('onekey', key);
	} */
	const handle_first_defocus = () => {
		showNotice = true;
		setTimeout(() => (showing_off = false), 600);
	};
	const focusing = () => {
		setTimeout(() => (showing_off = true), 200);
	};

	const filterElements = (event) => {
		value = event.target.value;

		// only shows events when input is not empty
		if (value) {
			const matches = Object.entries(data_by_id).filter(([id, str]) =>
				str.toLowerCase().startsWith(value.toLowerCase())
			);
			filtered_data = Object.fromEntries(matches);
			filteredElements = matches.map(([id]) => id);
		} else {
			filtered_data = {};
			filteredElements = [];
		}
		//console.log(filtered_data)
	};

	let searchInput;

	$: if (!value) {
		filteredElements = [];
		hiLiteIndex = null;
	}

	const setInputVal = (elementId) => {
		selectedId = elementId;
		console.log("selectedId", selectedId)
		value = filtered_data[elementId];
		searchInput.value = value; // update input field with string value
		filteredElements = [];
		hiLiteIndex = null;
		document.querySelector('#element-input').focus();
	};

	let hiLiteIndex = null;
	$: hiLitedElement = filteredElements[hiLiteIndex];

	const navigateList = (e) => {
		if (e.key === 'ArrowDown' && hiLiteIndex <= filteredElements.length - 1) {
			hiLiteIndex === null ? (hiLiteIndex = 0) : (hiLiteIndex += 1);
		} else if (e.key === 'ArrowUp' && hiLiteIndex !== null) {
			hiLiteIndex === 0 ? (hiLiteIndex = filteredElements.length - 1) : (hiLiteIndex -= 1);
		} else if (e.key === 'Enter') {
			setInputVal(filteredElements[hiLiteIndex]);
		} else {
			return;
		}
	};
	const handleInput = (event) => {
		value = event.target.value;
		console.log(special_val);
		console.log(value);
		console.log(filtered_data)
	};
</script>

<svelte:window on:keyup={navigateList} on:keydown={navigateList} />
<div class="autocomplete">
	<div class="autoInput-Wrapper">
		<input
			id="element-input"
			{name}
			type="text"
			{placeholder}
			bind:this={searchInput}
			bind:value
			on:change={handleInput}
			on:input={filterElements}
			on:submit={handleInput}
			on:blur={handle_first_defocus}
			on:focus={focusing}
		/>
		<input name={name + '_id'} type="hidden" />
	</div>

	{#if filteredElements.length > 0 && showing_off}
		<ul id="autocomplete-items-list">
			{#each Object.entries(filtered_data) as [id, name], i}
			<AutoCompleteInputElement
				itemLabel={name}
				highlighted={i === hiLiteIndex}
				on:click={() => setInputVal(id)}
			/>
		{/each}
		</ul>
	{/if}
</div>

<style>
	div.autoInput-Wrapper {
		/*the container must be positioned relative:*/
		position: relative;
		display: inline-block;
		width: 100%;
	}
	.autocomplete {
		width: 100%;
	}

	#autocomplete-items-list {
		position: relative;
		margin: 0;
		padding: 0;
		top: 0;
		width: 99%;
		border: 1px solid #ddd;
		background-color: #ddd;
	}
</style>
