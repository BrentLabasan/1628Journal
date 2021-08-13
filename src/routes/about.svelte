<script>
  import { browser, dev } from '$app/env';
  import TwenCard from './../lib/TwentyEight/Card.svelte';
  import {
    Card,
    CardTitle,
    CardSubtitle,
    CardActions,
    Button,
    Icon,
    Divider,
    MaterialApp } from 'svelte-materialify';
import { DateTime } from 'luxon';
import { onMount } from 'svelte';


    // Firebase App (the core Firebase SDK) is always required and
    // must be listed before other Firebase SDKs
    import firebase from 'firebase/app/dist/index.cjs.js'; // Firebase JS API v8

    // Add the Firebase services that you want to use
    // import "firebase/auth";
    import 'firebase/firestore/dist/index.node.cjs.js';


	// we don't need any JS on this page, though we'll load
	// it in dev so that we get hot module replacement...
	export const hydrate = dev;

	// ...but if the client-side router is already loaded
	// (i.e. we came here from elsewhere in the app), use it
	export const router = browser;

	// since there's no dynamic data here, we can prerender
	// it so that it gets served as a static asset in prod
  export const prerender = true;

function converter(x) {
  let hours = Math.floor(x / 60);
  let minutes = x % 60;
// debugger;
  return {
    hours: hours,
    minutes: minutes
  }
}
  
  let array = [];
  let firestore;
  onMount(async () => {

    // let roughCanvas = rough.canvas(document.getElementById(identifier));
    // roughCanvas.circle(15, 15, 25, { fill: 'black', fillWeight: 3 }); 



    const config = {
      apiKey: 'AIzaSyCo1_tSUtuq8bmuuGJ01AdvpkdUB4twU-Y',
      authDomain: 'dev-2d025.firebaseapp.com',
      projectId: 'dev-2d025',
      storageBucket: 'dev-2d025.appspot.com',
      messagingSenderId: '155757852699',
      appId: '1:155757852699:web:889c9bdf1423f1c082e0be',
      measurementId: 'G-209RZ60MX4'
    };

    // Initialize Firebase
    !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

    firestore = firebase.firestore();

    // var docRef = firestore.collection('twentyeights').doc(id);
    var collection28 = firestore.collection('twentyeights').get();

    // let data = {};

    // do not do this, will cause {#if array.length > 0} to fire prematurely 
    // for (let i = 0; i < 16; i++) {
    //   array[i] = [];
    // }

    // debugger;


    collection28
      .then((querySnapshot) => {

        // debugger;


        querySnapshot.forEach((twentyEight) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(twentyEight.id, " => ", twentyEight.data());

            // data[twentyEight.id] = twentyEight.data()
            
            if (twentyEight.data().period16) {

              if ( !array[twentyEight.data().period16] ) {
                array[twentyEight.data().period16] = [];
              }

              array[twentyEight.data().period16].push( twentyEight.data() );
            }

        });

            for (let i = 0; i < 16; i++) {
              if ( !array[i] ) {
                array[i] = [];
              }
            }


        // debugger;

        // console.log("data", data);
        // console.log(typeof data)
    });


  });


</script>

<svelte:head>
	<title>About</title>
</svelte:head>

{#if array.length > 0}

  {#each Array(16) as _, index}

    <section id={"sectionPeriod16_" + (index + 1)} class="periodSection">
      <h2>
        Period {index + 1} { DateTime.fromObject(converter(90 * index)).toFormat('HH:mm') } - { DateTime.fromObject(converter(90 * (index + 1))).toFormat('HH:mm') }
      </h2>

      <br/>
      <!-- { array.toString() } -->
      <!-- { array[index].toString() } -->

      {#each array[index] as twen}
        <!-- works -->
        <!-- { array[index].toString() } -->

        <!-- <TwenCard key={twen.id} twenData={twen} /> -->
        <TwenCard firestore={firestore} key={twen.id} twenData={twen} />

      {/each}

      <!-- <Day dateTime={firstDayDateTime + index + (7 * weekIndex)} /> -->							

    </section>

  {/each}

{/if}



<!-- <div class="content">
  <Card style="max-width:350px;">
    <img src="//picsum.photos/350" alt="background" />
    <CardTitle>Top western road trips</CardTitle>
    <CardSubtitle>1,000 miles of wonder</CardSubtitle>
    <Divider />
    <div class="pl-4 pr-4 pt-2 pb-2">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita autem,
      asperiores dolores, doloremque ea atque suscipit dolore, ut adipisci amet
      possimus dicta at voluptas consequatur!
    </div>
  </Card>
</div> -->

<style>
	.content {
		width: 100%;
		max-width: var(--column-width);
		margin: var(--column-margin-top) auto 0 auto;
	}

  .periodSection {
    border: 1px solid black;
    padding: 10px;
  }
</style>
