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
  apiKey: "AIzaSyCo1_tSUtuq8bmuuGJ01AdvpkdUB4twU-Y",
  authDomain: "dev-2d025.firebaseapp.com",
  projectId: "dev-2d025",
  storageBucket: "dev-2d025.appspot.com",
  messagingSenderId: "155757852699",
  appId: "1:155757852699:web:889c9bdf1423f1c082e0be",
  measurementId: "G-209RZ60MX4"
};

	// Initialize Firebase
  !firebase.apps.length ? firebase.initializeApp(config) : firebase.app()

  const timesToBeRendered = 4;
  
  function onClick() {
		alert('index onClick()')
	}
</script>

<section>
  <button on:click={onClick}>+ TWENTYEIGHT</button>
	<!-- {DateTime.now().toISODate()} -->
	<br />
	<br />
	{#each Array(timesToBeRendered) as _, index}
		<Week firstDayDateTime={DateTime.now()} weekIndex={index} />
	{/each}
</section>
