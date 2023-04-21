<script>
	export let steps = [], currentActive = 1;
	let circles, progress;
	
	export const handleProgress = (stepIncrement) => {
        console.log("triggered")
		circles = document.querySelectorAll('.one-step');
		if(stepIncrement == 1){
			currentActive++

			if(currentActive > circles.length) {
					currentActive = circles.length
			}
		} else {
			currentActive--

			if(currentActive < 1) {
					currentActive = 1 
			}
		}
		console.log(currentActive)

    	update()
	}

	export const handleJump = (index) => {
		currentActive = index;
		update();
	}
	
	function update() {
		circles.forEach((circle, idx) => {
			if(idx < currentActive) {
				circle.classList.add('active')
			} else {
				circle.classList.remove('active')
			}
			// Outcomment to activate click on elements
			/* circle.addEventListener('click', () => {
				handleJump(idx+1);
			}) */
		})

		const actives = document.querySelectorAll('.active');
	/* 	progress.style.width = (actives.length - 1) / (circles.length - 1) * 100 + '%'; */
	}
	
</script>


<div class="mt-4 w-full" bind:this={circles}>
    <ol bind:this={progress}
            class="flex items-center justify-center mb-6 w-full p-3 space-x-2 text-sm font-medium text-center text-gray-300 bg-gray-800 border rounded-lg shadow-sm  sm:text-base border-gray-700 sm:p-4 sm:space-x-4"
        >
        {#each steps as step, i}
        <li data-title={step} class="one-step flex items-center text-xs sm:text-sm {i +1 == currentActive ? 'text-blue-400' : ''} cursor-pointer">
            <span
                class="flex items-center justify-center w-5 h-5 mr-2 text-xs border  rounded-full shrink-0  {i +1 == currentActive ? 'border-blue-400 text-blue-400' : 'border-gray-300 text-gray-300'}"
            >
                {i+1}
            </span>
            {step} <!-- <span class="hidden sm:inline-flex sm:ml-2">Info</span> -->
            {#if i !== steps.length - 1}
            <svg
            aria-hidden="true"
            class="w-4 h-4 ml-2 sm:ml-4  {i +1 == currentActive ? 'text-blue-400' : 'stroke-gray-300'}"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            ><path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
            /></svg
        >
            {/if}
           
        </li>
        {/each}	
	</ol>
</div>
