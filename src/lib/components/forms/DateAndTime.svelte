<script>
	// DatePicker
	import Flatpickr from 'svelte-flatpickr';
	import 'flatpickr/dist/flatpickr.css';

	export let type = '';
	export let value = '';
	export let name="";
	let dateValue, formattedValue = '';

	const dateOptions = {
		enableTime: false
		/* onChange(selectedDates, dateStr) {
			console.log('flatpickr hook', selectedDates, dateStr);
		} */
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
		value = dateStr;
		console.log(value)
	}
</script>

{#if type === 'date'}
	<Flatpickr
	
		placeholder="Datum auswählen..."
		options={dateOptions}
		bind:value
		bind:formattedValue={value}
		on:change={handleChange}
		name={name}
	/>
{:else if type === 'time'}
	<Flatpickr
		placeholder="Uhrzeit auswählen..."
		options={timeOptions}
		bind:value
		bind:formattedValue={value}
		on:change={handleChange}
		name={name}
	/>
{/if}
