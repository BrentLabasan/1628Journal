<script>
	import Day from './Day.svelte';
	import { DateTime } from 'luxon';
    import rough from 'roughjs';
	import { onMount } from 'svelte';
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
				// debugger
				if (rangeStart === null) {
					// debugger;
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

		const target = document.getElementById(`forLine-${data.id}-${weekIndex}-${rangeStart}`)
		const rc2 = rough.canvas(target);

		if (countDaysCompleted >= 4) {
			// alert("4 or more days completed !!");
			console.log(`4 or more! rangeStart ${rangeStart} rangeEnd ${rangeEnd}`);
			// debugger

			// rc2.line(0, 0, 20, 0);
			rc2.line(0, 0, 90 * (rangeEnd - rangeStart), 0,  {strokeWidth: 7});
			// rc2.line(0, 0, 400, 0,  {strokeWidth: 5});
		} else {
			rc2.line(0, 0, 0, 0);
		}
	}

	onMount(async () => {
		handleLineRender();

	});


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
