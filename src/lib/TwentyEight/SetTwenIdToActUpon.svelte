<script>
	import { twenIdToActUpon } from './stores.js';
    import {openDialog, closeDialog} from './sharedCommands';

	function increment() {
        openDialog();
		// twenIdToActUpon.update(n => n + 1);
	}
</script>

<button on:click={increment}>
	click this to set twenId that's being acted upon
</button>