<script>
	import Day from './Day.svelte';
	const timesToBeRendered = 7;
</script>

<section>

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
