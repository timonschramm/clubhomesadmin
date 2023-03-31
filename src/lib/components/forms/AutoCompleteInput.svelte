<script>
	export let name = '';
	export let placeholder = '';
	export let value = '';
	export let type = '';
	export let data = [];
	import AutoCompleteInputElement from '$lib/components/forms/AutoCompleteInputElement.svelte';
	let filteredElements = [];

	let inputFocusVar = false;
	const inputFocus = () => {
		inputFocusVar = true;
		filteredElements = data;
	};
	const deFocus = () => {
		setTimeout(() => (inputFocusVar = false), 200);
	};

	const filterElements = (event) => {
		value = event.target.value;
		console.log(value);

		let storageArr = [];
		// only shows events when input is not empty
		if (inputValue) {
			data.forEach((element) => {
				// switch to includes when it should match by search
				if (element.toLowerCase().startsWith(inputValue.toLowerCase())) {
					storageArr = [...storageArr, makeMatchBold(element)];
				}
			});
		}
		filteredElements = storageArr;
	};

	let searchInput;
	let inputValue = '';

	$: if (!inputValue) {
		filteredElements = [];
		hiLiteIndex = null;
	}

	const clearInput = () => {
		inputValue = '';
		searchInput.focus();
	};

	const setInputVal = (elementName) => {
		inputValue = removeBold(elementName);
		filteredElements = [];
		hiLiteIndex = null;
		value = inputValue;
		document.querySelector('#element-input').focus();
	};

	const makeMatchBold = (str) => {
		// replace part of (country name === inputValue) with strong tags
		let matched = str.substring(0, inputValue.length);
		let makeBold = `<strong>${matched}</strong>`;
		let boldedMatch = str.replace(matched, makeBold);
		return boldedMatch;
	};

	const removeBold = (str) => {
		return str.replace(/<(.)*?>/g, '');
		// return str.replace(/<(strong)>/g, "").replace(/<\/(strong)>/g, "");
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
		console.log(value);
	};
</script>

<svelte:window on:keydown={navigateList} />
<div class="autocomplete">
	<div class="autoInput-Wrapper">
		<input
			id="element-input"
			{name}
			type="text"
			bind:this={searchInput}
			bind:value={inputValue}
			on:change={handleInput}
			on:input={filterElements}
			on:submit={handleInput}
		/>
		<!--  on:focus={inputFocus}
          on:blur={deFocus} -->
	</div>

	<!-- Displays list || change to on focus? -->
	<!--   {#if inputFocusVar} -->
	{#if filteredElements.length > 0}
		<ul id="autocomplete-items-list">
			{#each filteredElements as country, i}
				<AutoCompleteInputElement
					itemLabel={country}
					highlighted={i === hiLiteIndex}
					on:click={() => setInputVal(country)}
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
