<script>
	import { twenIdToActUpon } from './stores.js';
    import {openDialog, closeDialog} from './sharedCommands';

    export let key;

	function increment() {
        console.log("setting the 28 to act upon");
        twenIdToActUpon.update(n => key);

        openDialog();
	}
</script>

<button on:click={increment}>
    <!-- click to set target twenId {key} -->
    <i class="fa fa-bars" on:click={openDialog}></i>
</button>