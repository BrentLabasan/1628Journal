<script>
	import { twenIdToActUpon } from './stores.js';
    import {openDialog, closeDialog} from './sharedCommands';

    export let key;

	function increment() {
        alert(key);
        twenIdToActUpon.update(n => key);

        openDialog();
	}
</script>

<button on:click={increment}>
	click to set target twenId {key}
</button>