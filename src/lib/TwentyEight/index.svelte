<script>
	import TwentyEight from './TwentyEight.svelte';
  import { DateTime } from 'luxon';
  // import '@github/details-dialog-element';
  // import '../../../node_modules/@material/mwc-button/mwc-button.js';

  // import { WiredButton, WiredInput } from "wired-elements"

	// Firebase App (the core Firebase SDK) is always required and
	// must be listed before other Firebase SDKs
	import firebase from 'firebase/app';

	// Add the Firebase services that you want to use
	// import "firebase/auth";
	import 'firebase/firestore';

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

function openDialog() {
  document.querySelector('wired-dialog').setAttribute('open', '');
}
function closeDialog() {
  document.querySelector('wired-dialog').removeAttribute('open');
}

	function onClick_addHabit() {
    // alert('index onClick_addHabit()')
    
    const habitName = document.querySelector('[name=habitName]').value;

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
        dateTimeCompleted: '',
			};
		}

		db.collection('twentyeights')
			.add({
				startDate: DateTime.now().toISODate(), // todo might change
        days: obj,
        name: document.querySelector('[name=habitName]').value
				// last: 'Lovelace',
				// born: 1815
			})
			.then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
        

        db.collection("twentyeights").doc( docRef.id ).set({
            id: docRef.id
        })
			})
			.catch((error) => {
				console.error('Error adding document: ', error);
      });
      document.querySelector('[name=habitName]').value = null;

	}


	// var docRef = db.collection('twentyeights').doc(id);
	var collection28 = db.collection('twentyeights').get();

	let data = {};

	collection28
  .then((querySnapshot) => {


    querySnapshot.forEach((twentyEight) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(twentyEight.id, " => ", twentyEight.data());
        data[twentyEight.id] = twentyEight.data()
    });

    console.log("data", data);
    console.log(typeof data)
});
</script>

<section>
  <!-- <mwc-button on:click={onClick_addHabit} id="myButton" label="+ TWENTYEIGHT" raised></mwc-button> -->

  <!-- <mwcButton on:click={onClick_addHabit} id="myButton" label="+ TWENTYEIGHT" raised></mwcButton> -->

  <wired-button>Click Me</wired-button>
  <wired-button on:click={openDialog}>open dialog</wired-button>

  <wired-dialog>
    <p>
      Dialog content here
    </p>
    <div style="text-align: right; padding: 30px 16px 16px;">
      <wired-button id="closeDialog" on:click={closeDialog}>Close dialog</wired-button>
    </div>
  </wired-dialog>

  <button on:click={onClick_addHabit}>+ TWENTYEIGHT</button> <input type="text" name="habitName" placeholder="habit name" />

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
  
	<!-- {DateTime.now().toISODate()} -->
	<br />
  <br />

  
  
  {#if data}


  {#each Object.keys(data) as key, index}
  <!-- <TwentyEight db={db} entireCollection={data} key={key}  /> -->


  <!-- {data[key].days[DateTime.now().toISODate()].isCompleted} -->

  {data[key].tags}
  {#if data[key].tags && data[key].tags.includes('Alaska Airlines')}
  <TwentyEight db={db} entireCollection={data} key={key}  />
  {/if}
  
  {/each}

  {/if}


  
</section>
