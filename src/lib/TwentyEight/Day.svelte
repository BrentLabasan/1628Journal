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
    { dateTime.plus({ day: dayIndex + (7 * weekIndex)}).day }
<!-- {dateTime.plus({ day: dayIndex + (7 * weekIndex)}).toISODate()} -->
<br/>
<br/>
    <!-- {data.days[dateTime.plus({ day: dayIndex + (7 * weekIndex)}).toISODate()].isCompleted ? "T" : ""} -->

    

    {#if data.days[dateTime.plus({ day: dayIndex + (7 * weekIndex)}).toISODate()].isCompleted}
    <svg height="52" width="52">
      <circle cx="26" cy="26" r="26" stroke="black" stroke-width="0" fill="black" />
    </svg>
  {:else}
    <span>FA</span>
  {/if}

    <!-- <br/> -->

    <!-- {renderDateTimeCompleted()} -->

    <!-- works -->
    { data.days[dateTime.plus({ day: dayIndex + (7 * weekIndex)}).toISODate()].isCompleted ? DateTime.fromISO(data.days[dateTime.plus({ day: dayIndex + (7 * weekIndex)}).toISODate()].dateTimeCompleted).toLocaleString(DateTime.TIME_24_SIMPLE) : ''}


    <!-- { data.days[dateTime.plus({ day: dayIndex + (7 * weekIndex)}).toISODate()].isCompleted ? new DateTime(data.days[dateTime.plus({ day: dayIndex + (7 * weekIndex)}).toISODate()].dateTimeCompleted).toLocaleString(DateTime.TIME_24_SIMPLE) : ''} -->
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

    svg {
      /* position: absolute; */
      border: 1px solid yellow;
    }

    #dayContainer {
      display: flex;
      flex-direction: column;
    }
</style>