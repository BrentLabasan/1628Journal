<script>
	import Day from './Day.svelte';
	import { DateTime } from 'luxon';

	const timesToBeRendered = 7;
	export let docRef, data, firstDayDateTime, weekIndex;
	// console.log('Week firstDayDateTime', firstDayDateTime);
	// console.log('Week data', data);

	function handleLineRender(event) {
		// alert(event.detail.text);

		let countDaysCompleted = 0;
		for (let i = 0; i < 7; i++) {
			if (data.days[DateTime.fromISO(data.startDate).plus({day: i}).toISODate()].isCompleted) {
				countDaysCompleted++;
			}	
		}

		if (countDaysCompleted >= 4) {
			alert("4 or more days completed !!");
		}
	}



</script>

<section>
	<!-- {dateTime} -->
    <!-- <br/> -->
	



	{#each Array(timesToBeRendered) as _, index}
		<!-- <Day dateTime={firstDayDateTime + index + (7 * weekIndex)} /> -->
<Day on:linerender={handleLineRender} docRef={docRef} data={data} dateTime={firstDayDateTime} {weekIndex} dayIndex={index} />
    {/each}
    
    
</section>

<style>
	section {
		display: inline-grid;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
	}


</style>
