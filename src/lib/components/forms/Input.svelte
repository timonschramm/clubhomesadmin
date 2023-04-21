<script lang="ts">
	import AutoCompleteInput from './AutoCompleteInput.svelte';
	import DateAndTime from './DateAndTime.svelte';

	export let name = '';
	export let label = '';
	export let placeholder = '';
	export let value = '';
	export let iconPath = '';
	export let type = '';
	export let id = '';
	export let accept = '';
	export let requiredVal = false;
	export let data_by_id = {};
	export let selectedId = "";
	let showNotice = false;

	let iconPadding = iconPath !== '' ? 'iconExists' : 'noIconExists';
	let normalOrRadio = type === 'radio' ? 'radio' : 'input';
	const handle_first_defocus = () => {
		showNotice = requiredVal;
	};
	const handleInput = (event) => {
		value = event.target.value;
	};
</script>

<label for={name} class={normalOrRadio}>
	{label}
	<div class="{normalOrRadio} {iconPadding}">
		{#if iconPath !== ''}
			<span class="icon">
				<img src={iconPath} alt="icon" />
			</span>
		{/if}

		{#if Object.keys(data_by_id).length !== 0}
			<AutoCompleteInput bind:selectedId {data_by_id} bind:showNotice {name} bind:value {placeholder}/>
		{:else if type === 'date'}
			<DateAndTime bind:showNotice {name} type="date" bind:value />
		{:else if type === 'time'}
			<DateAndTime bind:showNotice {name} type="time" bind:value />
		{:else if type === 'file'}
			<input
				{id}
				{name}
				type="file"
				{accept}
				bind:value
				on:change={handleInput}
				on:input={handleInput}
			/>
		{:else if type === 'radio'}
			<fieldset>
				<input type="radio" id="mc" name="Geschlecht" value="Herren" />
				<label for="mc"> Herren</label>
				<input type="radio" id="vi" name="Geschlecht" value="Damen" />
				<label for="vi"> Damen</label>
				<input type="radio" id="ae" name="Geschlecht" value="AmericanExpress" />
				<label for="ae"> Divers</label>
			</fieldset>
		{:else if type === 'submit'}
			<input type="submit" {value} />
		{:else}
			<input
				on:blur={handle_first_defocus}
				{name}
				{type}
				{placeholder}
				on:change={handleInput}
				on:input={handleInput}
			/>
		{/if}
	</div>
	{#if showNotice && requiredVal && value === ''}
		<div class="error_feedback">
			<span>Bitte fülle dieses Feld aus!</span>
		</div>
	{/if}
</label>

<style>
	label {
		font-weight: 500;
		font-size: 0.875rem;
		line-height: 1.25rem;
		margin-bottom: 1rem;
	}
	label.input {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}
	label.radio fieldset {
		border: none !important;
		margin-bottom: 1rem;
	}
	label.radio .radio {
		margin-top: 5px;
	}
	label.radio .radio label {
		margin-right: 10px;
	}

	:global(.input) {
		position: relative;
		font-size: 0.875rem;
		line-height: 1.25rem;
		display: flex;
	}
	.icon img {
		position: absolute;
		margin: 6px;
		margin-left: 10px;
		color: #ccc;
		width: 20px;
	}
	:global(.input input),
	:global(.flatpickr-input),
	:global(.input button) {
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
		width: 100%;
	}
	:global(.iconExists input) {
		padding: 6px 3px 6px 42px;
	}
	:global(.noIconExists input) {
		padding: 6px 3px 6px 10px;
	}
	input[type='file']::file-selector-button {
		margin-right: 20px;
		border: none;
		background: #084cdf;
		padding: 10px 20px;
		border-radius: 10px;
		color: #fff;
		cursor: pointer;
		transition: background 0.2s ease-in-out;
	}

	input[type='file']::file-selector-button:hover {
		background: #0d45a5;
	}

	:global(.input input[type='submit'], .input button) {
		background: #0095f6 !important;
		color: #ffffff;
		padding: 10px 20px;
		width: 100%;
	}
	input[type='radio'] {
		--active: #275efe;
		--active-inner: #fff;
		--focus: 2px rgba(39, 94, 254, 0.25);
		--border: #bbc1e1;
		--border-hover: #275efe;
		--background: #fff;
		--disabled: #f6f8ff;
		--disabled-inner: #e1e6f9;
	}
	.error_feedback {
		display: flex;
		align-items: center;
		margin-left: 5px;
	}
	.error_feedback span {
		color: #ff3f3f;
		font-size: 14px !important;
		margin: 0;
		padding: 0 5px;
	}
	.error_feedback:before {
		color: #ff3f3f;
		content: '⚠ ';
		font-size: 14px;
	}
</style>
