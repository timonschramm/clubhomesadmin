<!-- src/routes/account/+page.svelte -->
<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import type { ActionData, PageData } from './$types';



	import { supabase } from '$lib/supabase';

	export let data: PageData;
	
</script>
<!-- <img src="/mail.svg" alt="Mail" />  -->
<div class="standard-Wrapper">
	<div class="form-widget">
		<h1>Profil bearbeiten</h1>
		<form action="?/logout" method="POST" >
			<div>
				<input type="submit" value="Abmelden" />
			</div>
		</form>
	</div>
	
</div>
