<script>
	import Day from './Day.svelte';
    const timesToBeRendered = 7;
    export let dateTime;
</script>

<section>
    <!-- {dateTime} -->
    <!-- <br/> -->
	{#each Array(timesToBeRendered) as _, index}
		<Day />
	{/each}
</section>

<style>
	section {
		display: inline-grid;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
	}

</style>
