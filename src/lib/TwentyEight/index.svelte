<script>
	import Week from './Week.svelte';
	import { DateTime } from 'luxon';

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

	const timesToBeRendered = 4;

	function onClick() {
		// alert('index onClick()')

		let obj = {};

		// DateTime.now().toISODate()
		const dt = DateTime.now();

		for (let i = 0; i < 28; i++) {
			obj[dt.plus({ day: i }).toISODate()] = {
        isCompleted: false,
        dateTimeCompleted: ''
			};
		}

		db.collection('twentyeights')
			.add({
				startDate: DateTime.now().toISODate(),
				days: obj
				// last: 'Lovelace',
				// born: 1815
			})
			.then((docRef) => {
				console.log('Document written with ID: ', docRef.id);
			})
			.catch((error) => {
				console.error('Error adding document: ', error);
			});
	}

	const id = 'p1A47gDIEgd6lIbIFZoT';

	var docRef = db.collection('twentyeights').doc(id);

	let data;

	docRef
		// .get()
		// .then((doc) => {
		// 	if (doc.exists) {
		// 		console.log('Document data:', doc.data());
		// 	} else {
		// 		// doc.data() will be undefined in this case
		// 		console.log('No such document!');
		// 	}
		// })
		// .catch((error) => {
		// 	console.log('Error getting document:', error);
		// });

		.onSnapshot((doc) => {
			console.log('Current data: ', doc.data());
			data = doc.data();
		});
</script>

<section>
	<button on:click={onClick}>+ TWENTYEIGHT</button>
	<!-- {DateTime.now().toISODate()} -->
	<br />
  <br />
  
  {#if data}
	{#each Array(timesToBeRendered) as _, index}
<Week docRef={docRef} data={data} firstDayDateTime={DateTime.now()} weekIndex={index} />
  {/each}
  {/if}


  
</section>
