<script>
	import { storyblokEditable, StoryblokComponent, renderRichText } from '@storyblok/svelte';
	import SubscribeForm from '$lib/components/SubscribeForm.svelte';
	let { blok } = $props();
	let content = $state(renderRichText(blok.bio));
</script>

<section id="contact" use:storyblokEditable={blok}>
	<div class="container mx-auto py-24 lg:py-40">
		{#each blok.intro as blok}
			<StoryblokComponent {blok} />
		{/each}
		<div class="mt-12 lg:mt-20">
			<img src={blok.image.filename} alt="Contact" class="w-full" />
			<div class="contact-bg px-4 py-8 lg:px-12 lg:py-14">
				<div class="flex flex-col justify-between gap-8 lg:flex-row">
					<div class="order-2 flex max-w-2xl flex-col gap-6 lg:order-1">
						<div class="prose prose-p:text-lg prose-p:text-secondary-text-light">
							{@html content}
						</div>
						<div class="grid grid-cols-3 items-center gap-8 sm:flex">
							<a href={blok.fb_link.cached_url} target="_blank" aria-label="Facebook" class="block">
								<img src="/img/social/fb.svg" alt="Facebook" class="h-9 w-auto" />
							</a>
							<a
								href={blok.ig_link.cached_url}
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Instagram"
								class="block"
							>
								<img src="/img/social/ig.svg" alt="Instagram" class="h-9 w-auto" />
							</a>
							<a
								href={blok.bc_link.cached_url}
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Bandcamp"
								class="block"
							>
								<img src="/img/social/bc.svg" alt="Bandcamp" class="h-9 w-auto" />
							</a>
							<a
								href={blok.spotify_link.cached_url}
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Spotify"
								class="block"
							>
								<img src="/img/social/spotify.svg" alt="Spotify" class="h-9 w-auto" />
							</a>
							<a
								href={blok.yt_link.cached_url}
								target="_blank"
								rel="noopener noreferrer"
								aria-label="YouTube"
								class="block"
							>
								<img src="/img/social/yt.svg" alt="YouTube" class="h-9 w-auto" />
							</a>
							<a
								href={blok.bit_link.cached_url}
								target="_blank"
								rel="noopener noreferrer"
								aria-label="BandIsInTown"
								class="block"
							>
								<img src="/img/social/bit.svg" alt="BandIsInTown" class="h-9 w-auto" />
							</a>
						</div>
						<div class="flex flex-col gap-1">
							<p class="font-semibold text-primary-text-light">
								{blok.hive_title}
							</p>
							<p class="text-secondary-text-light">
								{blok.hive_description}
							</p>
							<SubscribeForm />
						</div>
					</div>
					<div class="order-1 lg:order-2">
						<div>
							<p class="font-header text-2xl font-semibold text-primary-text-light uppercase">
								Hath is:
							</p>
							<ul class="mt-4">
								<li class="text-xl text-secondary-text-light">AJ Viana - Drums</li>
								<li class="mt-2 text-xl text-secondary-text-light">
									Frank Albanese - Guitars / Vocals
								</li>
								<li class="mt-2 text-xl text-secondary-text-light">Peter Brown - Guitars</li>
								<li class="mt-2 text-xl text-secondary-text-light">Greg Nottis - Bass / Vocals</li>
							</ul>
						</div>
						<div class="mt-8 lg:mt-12">
							<p class="font-header text-2xl font-semibold text-primary-text-light uppercase">
								Booking & Press
							</p>
							<a
								href="mailto:{blok.booking_email.cached_url}"
								class="text-xl text-secondary-text-light underline"
								>{blok.booking_email.cached_url}</a
							>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	#contact {
		background: #f7f5f3 url('/img/bg/contact-section-bg.avif');
		background-blend-mode: hard-light;
		background-size: cover, cover;
		background-position: center, center;
		background-repeat: no-repeat, no-repeat;
	}
	.contact-bg {
		background-image: url('/img/bg/contact-bg.avif');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}
</style>
