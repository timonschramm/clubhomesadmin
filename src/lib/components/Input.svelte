<script>
	export let name = '';
	export let label = '';
	export let placeholder = '';
	export let value = '';
	export let iconPath = '';
	export let type = '';
	export let id = '';
	export let data = [];

	const handleInput = (event) => {
		value = event.target.value;
	};

	// DatePicker
	import Flatpickr from 'svelte-flatpickr';
	import 'flatpickr/dist/flatpickr.css';
	import AutoCompleteInput from './AutoCompleteInput.svelte';
	let dateValue,
		formattedValue = '';

	const dateOptions = {
		enableTime: false,
		onChange(selectedDates, dateStr) {
			console.log('flatpickr hook', selectedDates, dateStr);
		}
	};
	const timeOptions = {
		enableTime: true,
		noCalendar: true,
		dateFormat: 'H:i',
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

<label for={name}>
	{label}
	<div class="input">
		{#if iconPath !== ''}
			<span class="icon">
				<img src={iconPath} alt="icon" />
			</span>
		{/if}

		{#if data.length > 0}
			<AutoCompleteInput {name} bind:value {placeholder} {data} />
		{:else if type === 'date'}
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
	:global(.input) {
		position: relative;
		font-size: 0.875rem;
		line-height: 1.25rem;
		display: flex;
	}
	.icon img {
		position: absolute;
		margin: 4px;
		margin-left: 10px;
		color: #ccc;
		width: 20px;
	}
	:global(.input input),
	:global(.flatpickr-input) {
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
</style>
