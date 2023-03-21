<script>
	export let name = '';
	export let label = '';
	export let placeholder = '';
	export let value = '';
	export let iconPath = '';
	export let type = '';

</script>

<label for={name}>
	{label}
	<div class="input">
		<span class="icon">
			<img src={iconPath} alt="icon" />
		</span>
		<input name={name} type={type} placeholder={placeholder} value={value} />
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
	input {
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
	}
	.icon img {
		position: absolute;
		margin: 4px;
		margin-left: 10px;
		color: #ccc;
	}
	.input {
		position: relative;
		font-size: 0.875rem;
		line-height: 1.25rem;
		display: flex;
	}
</style>
