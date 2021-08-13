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

  export let firestore, twenData, key ;

	const timesToBeRendered = 4;
	const id = key;

	// var docRef = firestore.collection('twentyeights').doc(id);
	// let data;

	// docRef
	// 	.onSnapshot((doc) => {
	// 		// console.log('Current data: ', doc.data());
	// 		data = doc.data();
  //   });

    console.log("twenData", twenData);
</script>


	<!-- {DateTime.now().toISODate()} -->


<Card style="max-width:350px;">

  <!-- <img src="//picsum.photos/350" alt="background" /> -->


  <CardTitle>
    <Checkbox checked={twenData.days[DateTime.now().toISODate()].isCompleted}></Checkbox>
    { twenData.name }
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

<style>

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