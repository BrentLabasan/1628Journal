<!-- each 28 is operating in real time mode -->

<script>
	import Week from './Week.svelte';
  import { DateTime } from 'luxon';
  import {
    Card,
    CardTitle,
    Checkbox,
    CardSubtitle,
    CardActions,
    Button,
    Icon,
    Divider,
    MaterialApp } from 'svelte-materialify';
  import {openDialog, closeDialog} from './sharedCommands';

  import { twenIdToActUpon } from './stores.js';
  import SetTwenIdToActUpon from './SetTwenIdToActUpon.svelte';
  import confirm from "./sound-effects/audioblocks-confirmation-3-note-alert-interface-note-alert-interface_StkQLWMI0v8_NWM.mp3"
  import bell from "./sound-effects/audioblocks-bell-alert-notification-6_St7kf8CDU_NWM.mp3";
  import granted from "./sound-effects/audioblocks-new-ability-granted-achieve-level-up-skill-learn-achieve-level-up-skill-learn_BZQXL_dXFvI_NWM.mp3";

  export let firestore, twenData, key ;

	const timesToBeRendered = 4;
	const id = key;

	var docRef = firestore.collection('twentyeights').doc(id);
	let data;

	docRef
		.onSnapshot((doc) => {
			// console.log('Current data: ', doc.data());
			data = doc.data();
    });

    console.log("twenData", twenData);

    function onClick() {
  // alert('Day onClick()')
  debugger;
  // const blah = DateTime.plus({ day: dayIndex + (7 * weekIndex)}).toISODate();
  const blah = DateTime.now().toISODate();
  // console.log(blah);
  const newObject = Object.assign({}, data )
  newObject.days[blah].isCompleted = !newObject.days[blah].isCompleted;

  if (newObject.days[blah].isCompleted) {
    var snd = new Audio(confirm); // buffers automatically when created
    snd.play();
    // mark in Firebase as completed
    newObject.days[blah].DateTimeCompleted = DateTime.now().toISO();
    console.log("Day is pending to be written as completed.");
  } else {
    newObject.days[blah].DateTimeCompleted = null;
    console.log("Day is pending to be written as NOT completed.");
  }




  // console.log(newObject);
  // attempting to write Day's status to Firebase
  docRef.set(newObject).then(() => {
    console.log("Day's status successfully written!");

    // dispatch('linerender', {
    //   text: 'Hello!'
    // });

    // let snd2 = new Audio("../../../sound-effects/audioblocks-bell-alert-notification-6_St7kf8CDU_NWM.mp3"); // buffers automatically when created
    
    const arrArr = [
      "03:00",
      "06:00",
      "09:00",
      "12:00",
      "15:00",
      "18:00",
      "21:00",
      "24:00",
    ];

    const period12 = [
      "02:00",
      "04:00",
      "06:00",
      "08:00",
      "10:00",
      "12:00",
      "14:00",
      "16:00",
      "18:00",
      "20:00",
      "22:00",
      "24:00",
    ];

    if (newObject.days[blah].isCompleted) {
      debugger;

      // if task was completed before OR during its target period
      if ( DateTime.now().toLocaleString(DateTime.TIME_24_SIMPLE) 
           <
            arrArr[data.period8 - 1] // b/c Periods of the day are not 0 based, but the array is
      ) {
        let snd2 = new Audio(bell); // buffers automatically when created
        setTimeout(function(){ snd2.play(); console.log("Task was completed before its period8 ended!") }, 1000);

        if ( DateTime.now().toLocaleString(DateTime.TIME_24_SIMPLE) 
           <
            arrArr[data.period8 - 2]
           ) {
            let snd3 = new Audio(granted); // buffers automatically when created
            setTimeout(function(){ snd3.play(); "Task was completed before its period8 started !!"}, 2000);
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

        if (dayInSequence.DateTimeCompleted) {
          // console.log(dayInSequence.DateTimeCompleted);


          if (earliestTimeIn28Completed === null) {
            earliestTimeIn28Completed = dayInSequence.DateTimeCompleted;
            // setTimeout(function(){ snd2.play(); }, 1000);
          } else {
            if (
              DateTime.fromISO(dayInSequence.DateTimeCompleted).toLocaleString(DateTime.TIME_24_SIMPLE) < 
              DateTime.fromISO(earliestTimeIn28Completed).toLocaleString(DateTime.TIME_24_SIMPLE) ) {
              earliestTimeIn28Completed = dayInSequence.DateTimeCompleted;
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
        // earliestTimeIn28Completed = dayInSequence.DateTimeCompleted;
        setTimeout(function(){ snd2.play(); }, 1000);
      }

    }
    // END code for unique sound if task that was completed is the earliest it was ever completed in 28
    */

  });
}
</script>


  <!-- {DateTime.now().toISODate()} -->
  
  {#if data}

<Card style="max-width:350px;">

  <!-- <img src="//picsum.photos/350" alt="background" /> -->


  <CardTitle>
    <!-- <Checkbox change={onClick} checked={data.days[DateTime.now().toISODate()].isCompleted}></Checkbox> -->
    {#if data.days[DateTime.now().toISODate()]}
    <input on:click={onClick} type="checkbox" checked={data.days[DateTime.now().toISODate()].isCompleted} />

    {/if}
    &nbsp;
    { twenData.name }
    <!-- <button on:click={onClick}>test</button> -->
  </CardTitle>
  <!-- <CardSubtitle>1,000 miles of wonder</CardSubtitle> -->
  <!-- <CardActions>
    <Button text>Button</Button>
    <Button text fab size="small" class="ml-auto" on:click={toggle}>
      <Icon path={mdiChevronDown} rotate={active ? 180 : 0} />
    </Button>
  </CardActions> -->
  <!-- {#if active}
    <div transition:slide>
      <Divider />
      <div class="pl-4 pr-4 pt-2 pb-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita autem,
        asperiores dolores, doloremque ea atque suscipit dolore, ut adipisci amet
        possimus dicta at voluptas consequatur!
      </div>
    </div>
  {/if} -->
</Card>

{/if}

<style>

CardTitle {
  cursor: pointer;
}

input[type="checkbox"]{
  width: 30px; /*Desired width*/
  height: 30px; /*Desired height*/
  cursor: pointer;
}
	#container_info {
		display: flex;
		justify-content: space-between;
	}

	.twentyEight_name {
		display: inline-block;
    border-top: 1px solid black;
    border-left: 1px solid black;
    border-bottom: 1px solid black;
        
    /* width: 50px;
    height: 50px;
    border-radius: 100px; */

    width: 150px;
    height: 70px;

    cursor: pointer;

    padding: 10px 0;
    padding: 5px;

    display: inline-flex;
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

	}
</style>