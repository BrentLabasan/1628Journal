<!-- each 28 is operating in real time mode -->

<script>
	import Week from './Week.svelte';
	import { DateTime } from 'luxon';
  import {openDialog, closeDialog} from './sharedCommands';

  import { twenIdToActUpon } from './stores.js';
  import SetTwenIdToActUpon from './SetTwenIdToActUpon.svelte';

  export let firestore, entireCollection, key ;

	const timesToBeRendered = 4;
	const id = key;

	var docRef = firestore.collection('twentyeights').doc(id);
	let data;

	docRef
		.onSnapshot((doc) => {
			// console.log('Current data: ', doc.data());
			data = doc.data();
    });
</script>

<section>
	<!-- {DateTime.now().toISODate()} -->

  {#if data}

    <!-- shows up on top of TwentyEight -->
    <!-- <div id="container_info">
      <span>
        {data.name}
      </span>
    
      <span>
        {data.tags}
      </span>
    </div> -->

    <section class="twentyEight_name">
      {data.name}
      <span>
        <!-- <i class="fa fa-bars" on:click={openDialog}></i> -->

        <SetTwenIdToActUpon key={key} />
      </span>
    </section>

    {#each Array(timesToBeRendered) as _, index}
      <Week docRef={docRef} data={data} firstDayDateTime={DateTime.fromISO(data.startDate)} weekIndex={index} />
    {/each}
  {/if}
</section>

<style>

	#container_info {
		display: flex;
		justify-content: space-between;
	}

	.twentyEight_name {
    box-sizing: content-box;
    
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