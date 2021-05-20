<script>
    import Week from './Week.svelte';
    import { DateTime } from 'luxon';
	const timesToBeRendered = 4;
</script>

<section>
    {DateTime.now().toISODate()  }
    <br/>
	{#each Array(timesToBeRendered) as _, index}
        <Week firstDayDateTime={DateTime.now()} weekIndex={index} />
	{/each}
</section>
