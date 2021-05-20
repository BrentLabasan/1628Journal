<script>
	// import Day from './Day.svelte';
    // const timesToBeRendered = 7;
    import { DateTime } from 'luxon';

    export let dateTime, weekIndex, dayIndex;
    console.log(dateTime, weekIndex, dayIndex);
</script>

<section>
    { dateTime.toISODate() } 
</section>
<style>
    section {
        display: inline-block;
        border-top: 1px solid black;
        border-left: 1px solid black;
        border-bottom: 1px solid black;
        
        /* width: 50px;
        height: 50px;
        border-radius: 100px; */

        width: 80px;
        height: 80px;
    }


</style>