<script>
	import TwentyEight from './TwentyEight.svelte';
	import ShowByTag from './ShowByTag.svelte';
	import ShowSelected from './ShowSelected.svelte';
  import { DateTime } from 'luxon';
  import { browser } from '$app/env';

  import {openDialog, closeDialog} from './sharedCommands';

  import { twenIdToActUpon } from './stores.js';

  let twenIdToActUpon_value;
  twenIdToActUpon.subscribe(value => {
		twenIdToActUpon_value = value;
	});

  // var randomstring = require("randomstring");
  // import  randomstring from "randomstring";
  // import cryptoRandomString from 'crypto-random-string';
  // all not working

  // import '@material/mwc-button';
  // import './node_modules/@material/mwc-button/mwc-button.js';
  // import '.\node_modules\@material\mwc-button\mwc-button.js';

  // import { vaadin-dialog as VaadinDialog } from '@vaadin/vaadin-dialog/vaadin-dialog.js';
  // import  VaadinDialog from '@vaadin/vaadin-dialog/vaadin-dialog.js';

  // const dialog = document.querySelector('vaadin-dialog');
  // dialog.renderer = function(root, dialog) {
  //   root.textContent = 'Sample dialog';
  // };

  // import '@github/details-dialog-element';
  // import '../../../node_modules/@material/mwc-button/mwc-button.js';

  // import { WiredButton, WiredInput } from "wired-elements"



	// Firebase App (the core Firebase SDK) is always required and
	// must be listed before other Firebase SDKs
	import firebase from 'firebase/app/dist/index.cjs.js'; // Firebase JS API v8

	// Add the Firebase services that you want to use
	// import "firebase/auth";
	import 'firebase/firestore/dist/index.node.cjs.js';

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

  var db = firebase.firestore();
  
  // each twen was updated to have a random 20 length alphanumeric
  function updateAFieldOfAllActiveHabits() {
    // Firebase v8
    db.collection("twentyeights").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());

            let twenRef = db.collection('twentyeights').doc(doc.id);

            twenRef.set({
                habitId: Array.from(Array(20), () => Math.floor(Math.random() * 36).toString(36)).join('')
            }, { merge: true });
        });
    });
  }

  function archiveAndCreateNewTwen() {
    // alert("archiveAndCreateNewTwen " + twenIdToActUpon_value);
    
    // - get data of 28 to archive

    var docRef = db.collection("twentyeights").doc(twenIdToActUpon_value);

    docRef.get().then((doc) => {
        if (doc.exists) {
            console.log("28 data:", doc.data());

            // - put it in archive > habitId > 28id

            db.collection("archive").doc(doc.data().habitId).set(
              {
                [doc.data().id]: doc.data()
              }
            )
            .then(() => {
                console.log("SUCCESSFUL: put it in archive > habitId > 28id");



                 // - make a new 28 starting at the current date

                  let obj = {};
                  
                  // DateTime.now().toISODate()
                  const dt = DateTime.now();

                  for (let i = 0; i < 28; i++) {
                    obj[dt.plus({ day: i }).toISODate()] = {
                      isCompleted: false,
                      dateTimeCompleted: null,
                    };
                  }

                  db.collection('twentyeights')
                    .add({
                      startDate: DateTime.now().toISODate(), // todo might change
                      days: obj,
                      name: doc.data().name,
                      tags: doc.data().tags
                    })
                    .then((docRef) => {
                      // console.log('Document written with ID: ', docRef.id);
                      
                      db.collection("twentyeights").doc( docRef.id ).update({
                          id: docRef.id
                      })

                      // - delete it from the current 28s
                      db.collection("twentyeights").doc(doc.data().id).delete().then(() => {
                          console.log(`Document ${doc.data().id} successfully removed from current 28s because it was archived.`);
                      }).catch((error) => {
                          console.error("Error removing document: ", error);
                      });

                    })
                    .catch((error) => {
                      console.error('Error adding document: ', error);
                    });








            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });

        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
  }

	function onClick_addHabit() {
    // alert('index onClick_addHabit()')
    
    const habitName = document.querySelector('[name=habitName]').value;
    const tagsString = document.querySelector('[name=tags]').value;
    const tagsArray = tagsString.split(',');

    if (!habitName) {
      alert("Please enter a name for the TwentyEight");
      return null;
    }

    let obj = {};
    
		// DateTime.now().toISODate()
		const dt = DateTime.now();

		for (let i = 0; i < 28; i++) {
			obj[dt.plus({ day: i }).toISODate()] = {
        isCompleted: false,
        dateTimeCompleted: null,
			};
		}

		db.collection('twentyeights')
			.add({
				startDate: DateTime.now().toISODate(), // todo might change
        days: obj,
        name: document.querySelector('[name=habitName]').value,
        tags: tagsArray
			})
			.then((docRef) => {
        // console.log('Document written with ID: ', docRef.id);
        
        db.collection("twentyeights").doc( docRef.id ).update({
            id: docRef.id
        })
			})
			.catch((error) => {
				console.error('Error adding document: ', error);
      });

      document.querySelector('[name=habitName]').value = null;
      document.querySelector('[name=tags]').value = null;

	}

	// var docRef = db.collection('twentyeights').doc(id);
	var collection28 = db.collection('twentyeights').get();

	let data = {};

	collection28
  .then((querySnapshot) => {

    querySnapshot.forEach((twentyEight) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(twentyEight.id, " => ", twentyEight.data());
        data[twentyEight.id] = twentyEight.data()
    });

    // console.log("data", data);
    // console.log(typeof data)
});

function filterDataByTag(data, tag) {
  // return data.filter(twentyEight => twentyEight.tags.includes(tag));

  // Object.entries(data).filter(([key, arr]) => console.log('blah', arr) );
  // console.log("woof" );

  // debugger;

  let newObject = Object.assign({}, data);

  Object.entries(data).filter( ([key, arr]) => { 
    // console.log("arr.tags", arr.tags);

    if (!arr.tags.includes(tag)) {
      delete newObject[key];
    }
  });

  return newObject;
}

  // onMount(async () => {

  //   const dia = document.createElement("vaadin-dialog");
  //   document.querySelector('dialogHolder').appendChild(dia);
  //   dia.setAttribute('opened');

  // });

  // let twenIdToActUpon = null;

  const tagsDefault = ['morning routine', 'Alaska Airlines', 'stretches', 'Fabricator Studio', 'daily reading', 'relationships', 'test']

  let urlTags = null, arrayTags = null;
  if (browser) { // https://kit.svelte.dev/faq
	  var url_string = window.location.href
    var url = new URL(url_string);
    urlTags = url.searchParams.get("tags");
    console.log(urlTags);
    if (urlTags) {
      arrayTags = urlTags.split(',')
    }
  }

</script>

<section>

  The twenId we're acting on is: {twenIdToActUpon_value}

  <div id="dialogHolder">dialog holder</div>

  <!-- <VaadinDialog opened></VaadinDialog> -->

  <!-- <mwc-button on:click={onClick_addHabit} id="myButton" label="+ TWENTYEIGHT" raised></mwc-button> -->

  <!-- <mwcButton on:click={onClick_addHabit} id="myButton" label="+ TWENTYEIGHT" raised></mwcButton> -->

  <wired-button>Click Me</wired-button>
  <wired-button on:click={openDialog}>open dialog</wired-button>

  <wired-dialog>
    <div id="wiredDialogInnerContainer">
      {twenIdToActUpon_value}
      <br/><br/>
      <button on:click={closeDialog}>X</button>
      <br/><br/>
      <button on:click={archiveAndCreateNewTwen}>archiveAndCreateNewTwen() </button>

    </div>
  </wired-dialog>

  <button on:click={onClick_addHabit}>+ TWENTYEIGHT</button> 
  <input type="text" name="habitName" placeholder="habit name" />
  <input type="text" name="tags" placeholder="tags (separated by commas, no spaces after commas)" />

  <!-- <details>
    <summary>Open dialog</summary>
    <details-dialog>
      Modal content
      <button type="button" data-close-dialog>Close</button>
    </details-dialog>
  </details> -->


  <!-- <details class="details-reset details-with-dialog mt-4">
    <summary class="btn" role="button">Dialog</summary>
    <details-dialog class="details-dialog anim-fade-in fast wide" aria-label="Dialog" role="dialog" aria-modal="true" tabindex="-1">
      <div class="Box d-flex flex-column">
        <div class="Box-header">
          Title
        </div>
        <div class="Box-body overflow-auto">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
        <div class="Box-footer">
          <button type="button" class="btn btn-block" data-close-dialog="">Close</button>
        </div>
      </div>
    </details-dialog>
  </details> -->
  
	<br />
  <br />
  <br />
  <br />

  {#if Object.keys(data).length > 0}

    <!-- <ShowByTag tag="Alaska Airlines" db={db} data={data}>
    </ShowByTag>
    <ShowByTag tag="stretches" db={db} data={data} >
    </ShowByTag>

    <ShowByTag tag="Fabricator Studio" db={db} data={data} >
    </ShowByTag>

    <ShowByTag tag="chores" db={db} data={data} >
    </ShowByTag>
    <ShowByTag tag="daily reading" db={db} data={data} >
    </ShowByTag> -->


    {#if urlTags}

      {#each arrayTags as tag, i}
        <ShowSelected tag="{tag}" db={db} data={filterDataByTag(data, tag)}>
        </ShowSelected>
      {/each}

    {:else}

      {#each tagsDefault as tag, i}
        <ShowSelected tag="{tag}" db={db} data={filterDataByTag(data, tag)}>
        </ShowSelected>
      {/each}

    {/if}

  <!-- <ShowSelected tag="" db={db} data={filterDataByTag(data, '')}>
  <ShowSelected tag="" db={db} data={filterDataByTag(data, '')}>
  <ShowSelected tag="" db={db} data={filterDataByTag(data, '')}> -->

  {/if}

  <button on:click={updateAFieldOfAllActiveHabits}>
    ADMIN
  </button>

  
</section>

<style>
  [name="tags"] {
    width: 400px;
  }

  #wiredDialogInnerContainer {
    /* width: 960px; */
    padding: 40px;
  }
</style>