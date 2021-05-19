<script>
    import Week from './Week.svelte';
    import { DateTime } from 'luxon';
	const timesToBeRendered = 4;
</script>

<section>
    <!-- {DateTime.now().toString()} -->
    <br/>
	{#each Array(timesToBeRendered) as _, index}
        <Week dateTime={DateTime.now()} />
	{/each}
</section>
