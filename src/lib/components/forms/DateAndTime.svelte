<script>
	// DatePicker
	import Flatpickr from 'svelte-flatpickr';
	import 'flatpickr/dist/flatpickr.css';

	export let type = '';
	export let value = '';
	export let name="";
	let dateValue, formattedValue = '';
	export let showNotice;


	const dateOptions = {
		enableTime: false,
		dateFormat: 'd.m.Y',
		allowInput: true,

	};
	const timeOptions = {
		enableTime: true,
		noCalendar: true,
		dateFormat: 'H:i',
		time_24hr: true,
		allowInput: true,

	};

	//$: console.log({ dateValue, formattedValue });

	function handleChange(event) {
		const [selectedDates, dateStr] = event.detail;
		console.log({ selectedDates, dateStr });
		value = dateStr;
		console.log(value)
	}
	const handle_first_defocus = () => {
		showNotice=true;
		console.log("now")
	};
</script>

{#if type === 'date'}
	<Flatpickr
		on:close={handle_first_defocus}
		placeholder="Datum auswählen..."
		options={dateOptions}
		bind:value
		bind:formattedValue={value}
		on:change={handleChange}
		name={name}
	/>
{:else if type === 'time'}
	<Flatpickr
		onblur={handle_first_defocus}
		placeholder="Uhrzeit auswählen..."
		options={timeOptions}
		bind:value
		bind:formattedValue={value}
		on:change={handleChange}
		name={name}
	/>
{/if}
