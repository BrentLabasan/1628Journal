<script>
	// import Day from './Day.svelte';
    // const timesToBeRendered = 7;
    import { DateTime } from 'luxon';

    export let docRef, data, dateTime, weekIndex, dayIndex;
    // console.log(data, dateTime, weekIndex, dayIndex);

    function renderDateTimeCompleted() {
      const blah = data.days[dateTime.plus({ day: dayIndex + (7 * weekIndex)}).toISODate()].dateTimeCompleted;
      console.log("blah", blah);
      if (blah && data.days[dateTime.plus({ day: dayIndex + (7 * weekIndex)}).toISODate()].isCompleted) {
        // return new DateTime(blah).toLocaleString(DateTime.TIME_24_SIMPLE)

        // return blah;
        return DateTime.fromISO(blah).toLocaleString(DateTime.TIME_24_SIMPLE)
      } else {
        return '';
      }
    }

    function onClick() {
        // alert('Day onClick()')
const blah = dateTime.plus({ day: dayIndex + (7 * weekIndex)}).toISODate();
console.log(blah);
          const newObject = Object.assign({}, data )
          newObject.days[blah].isCompleted = !newObject.days[blah].isCompleted;
          newObject.days[blah].dateTimeCompleted = DateTime.now().toISO();
console.log(newObject);
          docRef.set(newObject);
	}
</script>

<section id="dayContainer" on:click={onClick}>
    <!-- { dateTime.plus({ day: dayIndex + (7 * weekIndex)}).toISODate() }  -->

    <div id="container_dayNumber">
      { dateTime.plus({ day: dayIndex + (7 * weekIndex)}).day }

</div>
<!-- {dateTime.plus({ day: dayIndex + (7 * weekIndex)}).toISODate()} -->
    <!-- {data.days[dateTime.plus({ day: dayIndex + (7 * weekIndex)}).toISODate()].isCompleted ? "T" : ""} -->

    <div id="container_icon_completed">
      {#if data.days[dateTime.plus({ day: dayIndex + (7 * weekIndex)}).toISODate()].isCompleted}

      <svg height="52" width="52">
        <circle cx="26" cy="26" r="26" stroke="black" stroke-width="0" fill="black" />
      </svg>
  
      <!-- meow -->
  
    {:else}
      <span></span>
    {/if}
    </div>



    <!-- <br/> -->

    <!-- {renderDateTimeCompleted()} -->

    <!-- works -->
    <div id="container_timeCompleted">
      { data.days[dateTime.plus({ day: dayIndex + (7 * weekIndex)}).toISODate()].isCompleted ? DateTime.fromISO(data.days[dateTime.plus({ day: dayIndex + (7 * weekIndex)}).toISODate()].dateTimeCompleted).toLocaleString(DateTime.TIME_24_SIMPLE) : ''}
    </div>



    <!-- { data.days[dateTime.plus({ day: dayIndex + (7 * weekIndex)}).toISODate()].isCompleted ? new DateTime(data.days[dateTime.plus({ day: dayIndex + (7 * weekIndex)}).toISODate()].dateTimeCompleted).toLocaleString(DateTime.TIME_24_SIMPLE) : ''} -->
</section>

<style>
    #dayContainer {
        display: inline-block;
        border-top: 1px solid black;
        border-left: 1px solid black;
        border-bottom: 1px solid black;
        
        /* width: 50px;
        height: 50px;
        border-radius: 100px; */

        width: 100px;
        height: 100px;

        cursor: pointer;

        padding: 10px 0;

        display: flex;
      flex-direction: column;

      /* justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly | start | end | left | right ... + safe | unsafe; */

      justify-content: space-between;

/* weird */
      /* justify-content: center; */
      /* weird */
      /* justify-content: space-around; */
      /* weird */
      /* justify-content: space-evenly; */
      /* justify-content: ; */
      /* justify-content: ; */

      padding: 5px;
    }

    #container_timeCompleted {
      /* debug */
      border: 1px solid orange;
      align-self: center;

    }

    #container_dayNumber {
      /* debug */
      /* border: 1px solid blue; */
    }

    section:hover {
        background-color: grey;
    }

    #container_icon_completed {
      /* display: inline-flex; */
      /* display: inline-block; */

      /* position: absolute; */
      /* debug */
      border: 1px solid yellow;
      align-self: center;

      /* doesn't work */
      z-index: 999;
    }

</style>