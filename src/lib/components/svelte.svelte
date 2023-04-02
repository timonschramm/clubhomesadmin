<script>
	function validateEmail(email) {
		var re = /\S+@\S+\.\S+/;
		return re.test(email);
	}
	const errors = { name: '', email: '', message: '' };
	let formRef;

	try {
		const data = await Astro.request.formData();
		let name = data.get('name');
		let email = data.get('email');
		let message = data.get('message');
		data.set('name', name);
		if (typeof name !== 'string' || name.length < 1) {
			errors.name += 'Bitte gib deinen Namen an.';
		}
		if (typeof email !== 'string' || !validateEmail(email)) {
			errors.email += 'Deine E-Mail Adresse ist ungülitig.';
		}
		if (Object.values(errors).some((error) => error.length > 0)) {
			console.log('Fehler');
		}
		if (Object.values(errors).every((error) => error.length == 0)) {
			console.log('Erfolgreich gesendet!');
			console.log('Der Name war: ' + name);
			console.log('Der Email war: ' + email);
			console.log('Der Anhang war: ' + message);
			// Reset the contact form
		}
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
		}
	}
	function submitForm() {}
</script>

<div class="contact-Form">
	<h4>Kontakt</h4>
	<form on:submit={submitForm} method="POST">
		<div id="contact" class="contactField">
			<input placeholder="Name" type="text" name="name" required />
			{#if errors.name !== ''}
				<div class="errorMessage">
					<p>{errors.name}</p>
				</div>
			{/if}
		</div>
		<div class="contactField">
			<input placeholder="Email" type="email" name="email" required />
			{#if errors.email !== ''}
				<div class="errorMessage">
					<p>{errors.email}</p>
				</div>
			{/if}
		</div>
		<div class="contactField">
			<textarea
				class="form-control"
				name="message"
				id="message"
				cols="30"
				rows="7"
				placeholder="Deine Nachricht an uns"
				required
			/>
		</div>
		<div class="submitButton">
			<input value="Senden" type="submit" />
		</div>
	</form>
</div>

<style>
	.contact-Form {
		width: 100%;
		max-width: 600px;
		margin: 0 auto;
		background-color: #f7f7f7;
		padding: 20px;
		border-radius: 4px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
	}

	.contactField input {
		width: 100%;
	}
	.contact-Form .contactField input {
		padding: 5px;
		border: none;
		height: 40px;
		border-radius: 4px;
		box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
		background-color: #fff;
		color: #555;
		font-family: 'Roboto', sans-serif;
	}
	.contact-Form .contactField textarea {
		padding: 5px;
		border: none;
		border-radius: 4px;
		box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
		background-color: #fff;
		color: #555;
		font-family: 'Roboto', sans-serif;
		resize: vertical;
		min-height: 100px;
		width: 100%;
	}
	.contact-Form .contactField {
		margin-bottom: 10px;
	}
	.submitButton input {
		text-align: center;
		padding: 5px 10px 5px 10px;
		border: none;
		border-radius: 4px !important;
		background-color: #f9a826;
		color: #fff;
		font-family: 'Roboto', sans-serif;
		font-weight: bold;
		box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
	}

	.errorMessage {
		color: #ff3f3f;
		display: flex;
		align-items: center;
		margin-left: 5px;
		font-size: 14px !important;
	}
	.errorMessage p {
		color: #ff3f3f;
		font-size: 14px !important;
	}

	.errorMessage:before {
		content: '⚠ ';
		font-size: 14px;
	}

	.errorMessage p {
		margin: 0;
		padding: 0 5px;
	}
</style>
