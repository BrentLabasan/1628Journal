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

    // go through each day 
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

    // console.log(`countDaysCompleted ${countDaysCompleted} rangeStart ${rangeStart} rangeEnd ${rangeEnd}`);
    
    // "reset all Week's canvases lines to be nothings"
    for (i = 0; i < 7; i++) {
      // debugger;
      
      // tries to "reconfigure" the line, but I don't think rough.js works that way. I think it just draws another line lol
      /*
      let tempCanvas = document.getElementById(`forLine-${data.id}-${weekIndex}-${i}`);
      const rc3 = rough.canvas(tempCanvas);
      rc3.line(0, 0, 1, 0);
      */

      let tempCanvas = document.getElementById(`forLine-${data.id}-${weekIndex}-${i}`);
      let tempCanvasParent = tempCanvas.parentElement;
      let tempCanvasClone = tempCanvas.cloneNode();
      tempCanvas.remove();
      tempCanvasParent.appendChild(tempCanvasClone)
    }

    if (rangeStart !== null && countDaysCompleted >= 4) {
      const target = document.getElementById(`forLine-${data.id}-${weekIndex}-${rangeStart}`)
      const rc2 = rough.canvas(target);
      
    //   console.log(`4 or more! rangeStart ${rangeStart} rangeEnd ${rangeEnd}`);

      rc2.line(0, 0, 85 * (rangeEnd - rangeStart), 0,  {strokeWidth: 7, roughness: 0});
    }


    /*
		const target = document.getElementById(`forLine-${data.id}-${weekIndex}-${rangeStart}`)
		const rc2 = rough.canvas(target);

		if (countDaysCompleted >= 4) {
			// alert("4 or more days completed !!");
			console.log(`4 or more! rangeStart ${rangeStart} rangeEnd ${rangeEnd}`);
			// debugger
			target.style.visibility = "visible"

			// rc2.line(0, 0, 20, 0);
			rc2.line(0, 0, 85 * (rangeEnd - rangeStart), 0,  {strokeWidth: 7, roughness: 0});
			// rc2.line(0, 0, 400, 0,  {strokeWidth: 5});
		} else {
			target.style.visibility = "hidden"
    };
    */
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
