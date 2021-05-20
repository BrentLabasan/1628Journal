<script>
	// import Day from './Day.svelte';
    // const timesToBeRendered = 7;
    import { DateTime } from 'luxon';

    export let data, dateTime, weekIndex, dayIndex;
    // console.log(dateTime, weekIndex, dayIndex);

    function onClick() {
		alert('Day onClick()')
	}
</script>

<section on:click={onClick}>
    <!-- { dateTime.plus({ day: dayIndex + (7 * weekIndex)}).toISODate() }  -->
    { dateTime.plus({ day: dayIndex + (7 * weekIndex)}).day }
<!-- {dateTime.plus({ day: dayIndex + (7 * weekIndex)}).toISODate()} -->
<br/>
<br/>
    {data.days[dateTime.plus({ day: dayIndex + (7 * weekIndex)}).toISODate()].isCompleted}
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

        cursor: pointer;

        padding: 10px 0;
    }

    section:hover {
        background-color: grey;
    }


</style>