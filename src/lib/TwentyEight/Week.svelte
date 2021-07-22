<script>
	import Day from './Day.svelte';
	import { DateTime } from 'luxon';
    import rough from 'roughjs';

	const timesToBeRendered = 7;
	export let docRef, data, firstDayDateTime, weekIndex;
	// console.log('Week firstDayDateTime', firstDayDateTime);
	// console.log('Week data', data);

	function handleLineRender(event) {
		// alert(event.detail.text);

		let countDaysCompleted = 0;
		let rangeStart = null, rangeEnd = null;

		let i;
		for (i = 0; i < 7; i++) {
			if (data.days[DateTime.fromISO(data.startDate).plus({day: i + 7 * weekIndex}).toISODate()].isCompleted) {
				countDaysCompleted++;
				debugger
				if (rangeStart === null) {
					debugger;
					rangeStart = i;
				}

				
				if (rangeStart !== null && rangeEnd === null) {
					rangeEnd = i;
				}

				if (rangeStart !== null && rangeEnd !== null && i > rangeEnd) {
					rangeEnd = i;
				}

			}	
		}

		console.log(`countDaysCompleted ${countDaysCompleted}`);

		if (countDaysCompleted >= 4) {
			// alert("4 or more days completed !!");
			console.log(`4 or more! rangeStart ${rangeStart} rangeEnd ${rangeEnd}`);
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
