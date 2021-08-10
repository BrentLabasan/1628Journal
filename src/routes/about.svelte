<script context="module">
	import { browser, dev } from '$app/env';
  import {
    Card,
    CardTitle,
    CardSubtitle,
    CardActions,
    Button,
    Icon,
    Divider,
    MaterialApp } from 'svelte-materialify';

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
  <Card style="max-width:350px;">
    <img src="//picsum.photos/350" alt="background" />
    <CardTitle>Top western road trips</CardTitle>
    <CardSubtitle>1,000 miles of wonder</CardSubtitle>
    <Divider />
    <div class="pl-4 pr-4 pt-2 pb-2">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita autem,
      asperiores dolores, doloremque ea atque suscipit dolore, ut adipisci amet
      possimus dicta at voluptas consequatur!
    </div>
  </Card>
</div>

<style>
	.content {
		width: 100%;
		max-width: var(--column-width);
		margin: var(--column-margin-top) auto 0 auto;
	}
</style>
