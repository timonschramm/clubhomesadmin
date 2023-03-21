import  { derived, writable} from 'svelte/store';
import type { Writable} from 'svelte/store';

class MyFormStore {
    constructor(
        public passWordWritable : Writable<string> = writable(''),
        public passWordCheckWritable : Writable<string> = writable(''), 
    ){}
   
}
export const passWordWritable = writable("");
export const passWordCheckWritable = writable("");


export const myFormStore = new MyFormStore();
