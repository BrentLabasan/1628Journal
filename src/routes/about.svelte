<script context="module">
	import { browser, dev } from '$app/env';
	import { Card, CardText, CardActions, Button, MaterialApp } from 'svelte-materialify';

	// we don't need any JS on this page, though we'll load
	// it in dev so that we get hot module replacement...
	export const hydrate = dev;

	// ...but if the client-side router is already loaded
	// (i.e. we came here from elsewhere in the app), use it
	export const router = browser;

	// since there's no dynamic data here, we can prerender
	// it so that it gets served as a static asset in prod
	export const prerender = true;
</script>

<svelte:head>
	<title>About</title>
</svelte:head>

<div class="content">
	<Card outlined style="max-width:300px;">
		<div class="pl-4 pr-4 pt-3">
		  <span class="text-overline"> OVERLINE </span>
		  <br />
		  <span class="text-h5 mb-2">Headline</span>
		  <br />
		</div>
		<CardText>
		  Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, qui quaerat
		  rerum incidunt nisi ducimus?
		</CardText>
		<CardActions>
		  <Button rounded outlined>Button</Button>
		</CardActions>
	  </Card>
</div>

<style>
	.content {
		width: 100%;
		max-width: var(--column-width);
		margin: var(--column-margin-top) auto 0 auto;
	}
</style>
