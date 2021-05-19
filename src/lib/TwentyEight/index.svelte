<script>
	import Week from './Week.svelte';
	const timesToBeRendered = 4;
</script>

<section>
	a TwentyEight
	{#each Array(timesToBeRendered) as _, index}
		<Week />
	{/each}
</section>
