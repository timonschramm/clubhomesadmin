<script>
  
  import AutoCompleteInputElement from '$lib/components/AutoCompleteInputElement.svelte';
	let filteredElements = [];
  export let data = [];

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
    input[type=text] {
      background-color: #f1f1f1;
      width: 100%;
    }
    input[type=submit] {
      background-color: DodgerBlue;
      color: #fff;
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