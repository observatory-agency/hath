<script>
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Hath | Official Merch</title>
	<meta
		name="description"
		content="Official merch for Hath. Shop the latest releases and exclusive designs."
	/>
	<meta
		name="keywords"
		content="Hath, merch, official, store, clothing, apparel, t-shirts, hoodies, accessories"
	/>
	<meta name="author" content="Hath" />
	<meta name="robots" content="index, follow" />
	<meta name="googlebot" content="index, follow" />
	<meta name="bingbot" content="index, follow" />
	<meta name="yandexbot" content="index, follow" />
</svelte:head>

<Nav />
<main>
	{@render children?.()}
</main>
<Footer />
