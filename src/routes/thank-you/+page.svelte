<script>
	import ButtonGhostLink from '$lib/components/ui/ButtonGhostLink.svelte';
	import ThanksImage from '$lib/assets/thanks.jpg';
</script>

<svelte:head>
	<title>Thanks for Subscribing | Hath</title>
</svelte:head>

<section class="relative flex items-center justify-center bg-bg-dark">
	<div class="relative z-10 text-center">
		<img
			src={ThanksImage}
			alt="Pete and Frank giving a fist bump"
			class="mx-auto h-[80vh] w-full object-cover"
		/>
		<div class="mx-auto mt-12 max-w-2xl space-y-4 pb-2">
			<h1 class="font-header text-4xl tracking-wide text-primary-text-light uppercase md:text-5xl">
				Welcome to the Hive
			</h1>

			<p class="text-xl text-secondary-text-light/80">
				Thanks for subscribing. Check your inbox for a confirmation email so we can keep you posted
				on new releases, shows, and other news.
			</p>

			<div class="mt-8">
				<ButtonGhostLink href="/" text="Back to Home" />
			</div>
		</div>
	</div>
</section>
