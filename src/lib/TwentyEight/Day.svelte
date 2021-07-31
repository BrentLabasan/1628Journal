<script>
  import { DateTime } from 'luxon';
  import rough from 'roughjs';
  import { onMount } from 'svelte';
  // import 'animate.css';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  import confirm from "./sound-effects/audioblocks-confirmation-3-note-alert-interface-note-alert-interface_StkQLWMI0v8_NWM.mp3"
  import bell from "./sound-effects/audioblocks-bell-alert-notification-6_St7kf8CDU_NWM.mp3";
  import granted from "./sound-effects/audioblocks-new-ability-granted-achieve-level-up-skill-learn-achieve-level-up-skill-learn_BZQXL_dXFvI_NWM.mp3";
  export let docRef, data, dateTime, weekIndex, dayIndex;
// console.log(data, dateTime, weekIndex, dayIndex);

const identifier = `${data.id}-${weekIndex}-${dayIndex}`

function renderDateTimeCompleted() {
  const blah = data.days[dateTime.plus({ day: dayIndex + (7 * weekIndex)}).toISODate()].dateTimeCompleted;
  // console.log("blah", blah);
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
  // console.log(blah);
  const newObject = Object.assign({}, data )
  newObject.days[blah].isCompleted = !newObject.days[blah].isCompleted;

  if (newObject.days[blah].isCompleted) {
    var snd = new Audio(confirm); // buffers automatically when created
    snd.play();
    // mark in Firebase as completed
    newObject.days[blah].dateTimeCompleted = DateTime.now().toISO();
    console.log("Day is pending to be written as completed.");
  } else {
    newObject.days[blah].dateTimeCompleted = null;
    console.log("Day is pending to be written as NOT completed.");
  }

  dispatch('linerender', {
    text: 'Hello!'
  });


  // console.log(newObject);
  docRef.set(newObject).then(() => {
    console.log("Day's status successfully written!");
    // let snd2 = new Audio("../../../sound-effects/audioblocks-bell-alert-notification-6_St7kf8CDU_NWM.mp3"); // buffers automatically when created
    
    const arrArr = [
      "3:00",
      "6:00",
      "9:00",
      "12:00",
      "15:00",
      "18:00",
      "21:00",
      "24:00",
    ];

    if (newObject.days[blah].isCompleted) {
      // debugger;

      // if task was completed before OR during its target period
      if ( DateTime.now().toLocaleString(DateTime.TIME_24_SIMPLE) 
           <
            arrArr[data.period8]
      ) {
        let snd2 = new Audio(bell); // buffers automatically when created
        setTimeout(function(){ snd2.play(); }, 1000);

        if ( DateTime.now().toLocaleString(DateTime.TIME_24_SIMPLE) 
           <
            arrArr[data.period8 - 1]
           ) {
            let snd3 = new Audio(granted); // buffers automatically when created
            setTimeout(function(){ snd3.play(); }, 1000);
           }
      }
    }

    /*
    // BEGIN code for unique sound if task that was completed is the earliest it was ever completed in 28
    let snd2 = new Audio(bell); // buffers automatically when created
    // sound effect logic
    if (newObject.days[blah].isCompleted) {

      // - play an extra sound effect upon marking a Day as completed, if it's the earliest time completed so far of that week

      let earliestTimeIn28Completed = null;

      for (let i = 0; i < 28; i++) {
        // debugger;

        let dayInSequence = data.days[ DateTime.fromISO(data.startDate).plus({days: i}).toISODate() ];

        if (dayInSequence.dateTimeCompleted) {
          // console.log(dayInSequence.dateTimeCompleted);


          if (earliestTimeIn28Completed === null) {
            earliestTimeIn28Completed = dayInSequence.dateTimeCompleted;
            // setTimeout(function(){ snd2.play(); }, 1000);
          } else {
            if (
              DateTime.fromISO(dayInSequence.dateTimeCompleted).toLocaleString(DateTime.TIME_24_SIMPLE) < 
              DateTime.fromISO(earliestTimeIn28Completed).toLocaleString(DateTime.TIME_24_SIMPLE) ) {
              earliestTimeIn28Completed = dayInSequence.dateTimeCompleted;
            }
          }
        }
      }

      // console.log("taco", DateTime.now().toLocaleString(DateTime.TIME_24_SIMPLE));
      // console.log("taco", DateTime.fromISO(earliestTimeIn28Completed).toLocaleString(DateTime.TIME_24_SIMPLE));
      // debugger;

      if (
        DateTime.now().toLocaleString(DateTime.TIME_24_SIMPLE) 
        ===
        DateTime.fromISO(earliestTimeIn28Completed).toLocaleString(DateTime.TIME_24_SIMPLE) ) {
        // earliestTimeIn28Completed = dayInSequence.dateTimeCompleted;
        setTimeout(function(){ snd2.play(); }, 1000);
      }

    }
    // END code for unique sound if task that was completed is the earliest it was ever completed in 28
    */

  });
}
  
  onMount(async () => {

    let roughCanvas = rough.canvas(document.getElementById(identifier));
    roughCanvas.circle(15, 15, 25, { fill: 'black', fillWeight: 3 }); 

  });
  

</script>

<section class:evenWeek="{ weekIndex % 2 === 0}" id="dayContainer" on:click={onClick}>
  <!-- { dateTime.plus({ day: dayIndex + (7 * weekIndex)}).toISODate() }  -->

  <div 
    id="container_dayNumber"
    class:bold="{dateTime.plus({ day: dayIndex + (7 * weekIndex)}).toISODate() === DateTime.now().toISODate()}"
    class="animate__animated animate__infinite"
    class:animate__headShake="{dateTime.plus({ day: dayIndex + (7 * weekIndex)}).toISODate() === DateTime.now().toISODate() && !data.days[dateTime.plus({ day: dayIndex + (7 * weekIndex)}).toISODate()].isCompleted}"
  >

    { dateTime.plus({ day: dayIndex + (7 * weekIndex)}).day }
    { dateTime.plus({ day: dayIndex + (7 * weekIndex)}).weekdayShort }

  </div>

  <!-- {dateTime.plus({ day: dayIndex + (7 * weekIndex)}).toISODate()} -->
  <!-- {data.days[dateTime.plus({ day: dayIndex + (7 * weekIndex)}).toISODate()].isCompleted ? "T" : ""} -->

  <div id="container_icon_completed">

    <!-- <svg height="30" width="30">
      <circle cx="15" cy="15" r="15" stroke="black" stroke-width="0" fill="black" />
    </svg> -->

    <canvas 
    date={dateTime.toISODate()}
    class="doodle-btn"
    class:hidden="{!data.days[dateTime.plus({ day: dayIndex + (7 * weekIndex)}).toISODate()].isCompleted}"
    id={identifier} width="30" height="30">
      &nbsp;
    </canvas>

    <canvas style="pointer-events: none; position: absolute; margin-top: 10px; margin-left: -20px;" id={`forLine-${identifier}`} width="500" height="10">
      &nbsp;
    </canvas>

      <!-- <svg id="svg"></svg> -->
      <!-- <span id="target">a</span> -->
  
  </div>

  <!-- {renderDateTimeCompleted()} -->

  <!-- works -->
  <div id="container_timeCompleted">
    {#if data.days[dateTime.plus({ day: dayIndex + (7 * weekIndex)}).toISODate()].isCompleted}

      { data.days[dateTime.plus({ day: dayIndex + (7 * weekIndex)}).toISODate()].isCompleted ? DateTime.fromISO(data.days[dateTime.plus({ day: dayIndex + (7 * weekIndex)}).toISODate()].dateTimeCompleted).toLocaleString(DateTime.TIME_24_SIMPLE) : ''}
    {/if}
  </div>

  <!-- { data.days[dateTime.plus({ day: dayIndex + (7 * weekIndex)}).toISODate()].isCompleted ? new DateTime(data.days[dateTime.plus({ day: dayIndex + (7 * weekIndex)}).toISODate()].dateTimeCompleted).toLocaleString(DateTime.TIME_24_SIMPLE) : ''} -->
</section>

<style>
  .hidden {
    visibility: hidden;
  }

  #dayContainer {
    display: inline-block;

    border-top: 1px dashed orangered;
    border-left: 1px dashed orangered;
    border-bottom: 1px dashed orangered;
    
    /* width: 50px;
    height: 50px;
    border-radius: 100px; */

    width: 70px;
    height: 70px;

    cursor: pointer;

    padding: 10px 0;

    display: flex;
    flex-direction: column;

    /* justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly | start | end | left | right ... + safe | unsafe; */
    justify-content: space-between;

    padding: 5px;
  }

  #container_timeCompleted {
    align-self: center;

    /* debug */
    /* border: 1px solid orange; */
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
    /* border: 1px solid yellow; */

    align-self: center;

    /* doesn't work */
    z-index: 999;
    

    /* animation: blinker 1s linear infinite; */
  }

  @keyframes blinker {
    50% {
      opacity: 0;
    }
  }

  .bold {
    font-weight: bold;
  }


  .doodle-btn {
    /* cursor: pointer; */
  }

  .evenWeek {
    background-color: rgb(216, 216, 216);
  }

</style>