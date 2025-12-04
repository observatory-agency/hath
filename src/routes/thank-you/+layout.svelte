<script>
	import '../../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<main class="thank-you-page h-screen bg-bg-dark">
	{@render children?.()}
</main>

<style>
	:global(body:has(.thank-you-page) .nav-boi),
	:global(body:has(.thank-you-page) footer) {
		display: none;
	}
</style>
