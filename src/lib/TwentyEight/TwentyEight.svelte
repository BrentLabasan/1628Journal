<script>
	import Week from './Week.svelte';
	import { DateTime } from 'luxon';

    export let db, entireCollection, key ;


	const timesToBeRendered = 4;

	const id = key;

	var docRef = db.collection('twentyeights').doc(id);

	let data;

	docRef
		.onSnapshot((doc) => {
			console.log('Current data: ', doc.data());
			data = doc.data();
		});

</script>

<section>
	<!-- {DateTime.now().toISODate()} -->
	<br />
  <br />

  
  
  {#if data}

  <div>
    {data.name}
  </div>

	{#each Array(timesToBeRendered) as _, index}
<Week docRef={docRef} data={data} firstDayDateTime={DateTime.now()} weekIndex={index} />
  {/each}
  {/if}


  
</section>
