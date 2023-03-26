<script>
  export let name="";
	export let placeholder = '';
	export let value = '';
	export let type = '';
  export let data = [];
  import AutoCompleteInputElement from '$lib/components/AutoCompleteInputElement.svelte';
	let filteredElements = [];
  let inputFocusVar = false;
  const inputFocus = () => {
    inputFocusVar = !inputFocusVar;
    filteredElements = data;

  }


	const filterElements = () => {
		let storageArr = [];
    // only shows events when input is not empty
		if (true) {
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
	};
  </script>
  
  
  <svelte:window on:keydown={navigateList} />
    <div>
      <div class="autocomplete">
        <input
          id="element-input"
          type="text"
          bind:this={searchInput}
          bind:value={inputValue}
          on:change={handleInput}
          on:input={filterElements}
          on:focus={inputFocus}
          on:blur={inputFocus}
        />
      </div>


      <!-- Displays list || change to on focus? -->
      {#if inputFocusVar}
     <!--  {#if filteredElements.length > 0} -->
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
    div.autocomplete {
      /*the container must be positioned relative:*/
      position: relative;
      display: inline-block;
      width: 300px;
    }
    input {
      border: 1px solid transparent;
      background-color: #f1f1f1;
      padding: 10px;
      font-size: 16px;
      margin: 0;
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