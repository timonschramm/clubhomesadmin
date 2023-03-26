<script>
	export let name = '';
	export let label = '';
	export let placeholder = '';
	export let value = '';
	export let iconPath = '';
	export let type = '';
	export let id = '';

	const handleInput = (event) => {
		value = event.target.value;
	};
	
	export let data = [];

	// For AutoCompleteInput
	import AutoCompleteInputElement from '$lib/components/AutoCompleteInputElement.svelte';
	let filteredElements = [];

	const filterElements = () => {
		let storageArr = [];
		if (inputValue) {
			data.forEach((country) => {
				if (country.toLowerCase().startsWith(inputValue.toLowerCase())) {
					storageArr = [...storageArr, makeMatchBold(country)];
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

	const setInputVal = (countryName) => {
		inputValue = removeBold(countryName);
		filteredElements = [];
		hiLiteIndex = null;
		document.querySelector('#element-input').focus();
	};

	const submitValue = () => {
		if (!data.includes(inputValue)) {
			alert('Create a new Team');
		} else if (inputValue) {
			console.log(`${inputValue} is submitted!`);
			setTimeout(clearInput, 1000);
		} else {
			alert("You didn't type anything.");
		}
	};

	const makeMatchBold = (str) => {
		// replace part of (country name === inputValue) with strong tags
		let matched = str.substring(0, inputValue.length);
		let makeBold = `<strong>${matched}</strong>`;
		let boldedMatch = str.replace(matched, makeBold);
		return boldedMatch;
	};

	const removeBold = (str) => {
		//replace < and > all characters between
		return str.replace(/<(.)*?>/g, '');
		// return str.replace(/<(strong)>/g, "").replace(/<\/(strong)>/g, "");
	};

	let hiLiteIndex = null;
	//$: console.log(hiLiteIndex);
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

	// DatePicker
	import Flatpickr from 'svelte-flatpickr';
	import 'flatpickr/dist/flatpickr.css';
	let dateValue, formattedValue = "";

	const dateOptions = {
		enableTime: false,
		onChange(selectedDates, dateStr) {
			console.log('flatpickr hook', selectedDates, dateStr);
		}
	};
	const timeOptions = {
		enableTime: true,
		noCalendar: true,
		dateFormat: "H:i",
		time_24hr: true
	};

	$: console.log({ dateValue, formattedValue });

	function handleChange(event) {
		const [selectedDates, dateStr] = event.detail;
		console.log({ selectedDates, dateStr });
	}

	function handleSubmit(event) {
		event.preventDefault();

		console.log(event.target.elements['date'].value);
	}
</script>

<svelte:window on:keydown={navigateList} />

<label for={name}>
	{label}
	<div class="input">
		{#if iconPath !== ''}
			<span class="icon">
				<img src={iconPath} alt="icon" />
			</span>

		{/if}

		{#if data.length > 0}
			<div>
				<div class="autocomplete">
					<input
						id="element-input"
						type="text"
						bind:this={searchInput}
						bind:value={inputValue}
						on:change={handleInput}
						on:input={filterElements}
					/>
				</div>


				<!-- FILTERED LIST OF COUNTRIES -->
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
		{:else}
			{#if type === 'date'}
				<Flatpickr
					placeholder="Datum auswählen..."
					options={dateOptions}
					bind:value
					bind:formattedValue
					on:change={handleChange}
					name="date"
				/>
				
			{:else if type === 'time'}
			<Flatpickr
				placeholder="Uhrzeit auswählen..."
				options={timeOptions}
				bind:value
				bind:formattedValue
				on:change={handleChange}
				name="time"
			/>
			{:else}
				<input {id} {name} {type} {placeholder} on:change={handleInput} on:input={handleInput} />
			{/if}
		{/if}
	</div>
</label>

<style>
	label {
		font-weight: 500;
		font-size: 0.875rem;
		line-height: 1.25rem;
		display: flex;
		flex-direction: column;
		gap: 5px;
		margin-bottom: 1rem;
	}
	input, :global(.flatpickr-input) {
		font-size: 0.9rem;
		font-weight: 300;
		background: transparent;
		border-radius: 0.375rem;
		border-style: solid;
		border-width: 1px;
		border-color: #ccc;
		box-sizing: border-box;
		display: block;
		flex: 1;
		padding: 6px 3px 6px 42px;
		padding-left: -30px;
	}
	.icon img {
		position: absolute;
		margin: 4px;
		margin-left: 10px;
		color: #ccc;
		width: 20px;
	}
	.input {
		position: relative;
		font-size: 0.875rem;
		line-height: 1.25rem;
		display: flex;
	}
	div.autocomplete {
		/*the container must be positioned relative:*/
		position: relative;
		display: inline-block;
		width: 300px;
	}
	#autocomplete-items-list {
		position: relative;
		margin: 0;
		padding: 0;
		top: 0;
		width: 297px;
		border: 1px solid #ddd;
		background-color: #ddd;
	}
</style>
