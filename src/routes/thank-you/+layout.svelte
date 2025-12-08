<script>
	import '../../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<!-- Thank you page specific meta tags -->
	<title>Thank you for subscribing | Hath</title>
	<meta
		name="description"
		content="Thank you for subscribing to Hath. We will keep you posted on new releases, shows, and other news."
	/>
	<meta
		name="keywords"
		content="Hath, New Jersey Death Metal, merch, official, store, clothing, apparel, t-shirts, hoodies, accessories"
	/>
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
