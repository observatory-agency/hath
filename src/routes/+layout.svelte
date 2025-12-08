<script>
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Hath | New Jersey Death Metal</title>
	<meta
		name="description"
		content="New Jersey Death Metal band. Shop the latest releases, exclusive designs, tour dates, and more."
	/>
	<meta
		name="keywords"
		content="Hath, New Jersey Death Metal, merch, official, store, clothing, apparel, t-shirts, hoodies, accessories"
	/>

	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://hath.band" />
	<meta property="og:title" content="Hath | New Jersey Death Metal" />
	<meta
		property="og:description"
		content="New Jersey Death Metal band. Shop the latest releases, exclusive designs, tour dates, and more."
	/>
	<meta property="og:image" content="https://hath.band/img/meta.jpg" />

	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://hath.band" />
	<meta property="twitter:title" content="Hath | New Jersey Death Metal" />
	<meta
		property="twitter:description"
		content="New Jersey Death Metal band. Shop the latest releases, exclusive designs, tour dates, and more."
	/>
	<meta property="twitter:image" content="https://hath.band/img/meta.jpg" />

	<meta name="author" content="Hath" />
	<meta name="robots" content="index, follow" />
	<meta name="googlebot" content="index, follow" />
	<meta name="bingbot" content="index, follow" />
	<meta name="yandexbot" content="index, follow" />

	<!-- Privacy-friendly analytics by Plausible -->
	<script async src="https://plausible.io/js/pa-vqbuR2ImjkLQX4h4xJ8A7.js"></script>
	<script>
		((window.plausible =
			window.plausible ||
			function () {
				(plausible.q = plausible.q || []).push(arguments);
			}),
			(plausible.init =
				plausible.init ||
				function (i) {
					plausible.o = i || {};
				}));
		plausible.init();
	</script>
</svelte:head>

<Nav />
<main>
	{@render children?.()}
</main>
<Footer />
