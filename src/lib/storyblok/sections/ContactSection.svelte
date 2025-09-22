<script>
	import { storyblokEditable, StoryblokComponent, renderRichText } from '@storyblok/svelte';
	import SubscribeForm from '$lib/components/SubscribeForm.svelte';
	let { blok } = $props();
	let content = $state(renderRichText(blok.bio));
</script>

<section id="contact" use:storyblokEditable={blok}>
	<div class="container mx-auto py-40">
		{#each blok.intro as blok}
			<StoryblokComponent {blok} />
		{/each}
		<div class="mt-20">
			<img src={blok.image.filename} alt="Contact" class="w-full" />
			<div class="contact-bg p-14">
				<div class="flex justify-between">
					<div class="flex max-w-2xl flex-col gap-8">
						<div class="prose prose-p:text-lg prose-p:text-secondary-text-light">
							{@html content}
						</div>
						<div class="flex items-center gap-4">
							<a href={blok.fb_link.cached_url} aria-label="Facebook" class="block">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									class="h-8 w-auto"
									viewBox="0 0 24 24"
									><path
										fill="#E7E1DA"
										d="M13.345 5.138c0-.966.863-1.313 1.828-1.313.966 0 1.997.3 1.997.3L17.79.45S16.476 0 13.344 0c-1.922 0-3.037.731-3.853 1.81-.769 1.021-.797 2.662-.797 3.721v2.41H6.211v3.59h2.484V24h4.65V11.531h3.685l.272-3.59h-3.957V5.138Z"
									/></svg
								>
							</a>
							<a href={blok.ig_link.cached_url} aria-label="Instagram" class="block">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									class="h-8 w-auto"
									viewBox="0 0 24 24"
									><g clip-path="url(#a)"
										><path
											fill="#E7E1DA"
											d="M19.36 0H4.64A4.645 4.645 0 0 0 0 4.64V19.37c0 2.56 2.081 4.64 4.64 4.64h14.72c2.559 0 4.64-2.08 4.64-4.64V4.63C23.99 2.081 21.91 0 19.36 0Zm1.33 2.766h.535V6.834l-4.06.01-.009-4.069 3.535-.01ZM8.57 9.534a4.233 4.233 0 0 1 3.422-1.762c1.406 0 2.653.694 3.421 1.762.507.694.797 1.547.797 2.466a4.235 4.235 0 0 1-4.228 4.228c-2.334 0-4.21-1.903-4.21-4.228 0-.919.3-1.772.798-2.466Zm13.087 9.825a2.3 2.3 0 0 1-2.297 2.297H4.641a2.3 2.3 0 0 1-2.297-2.297V9.534h3.581A6.532 6.532 0 0 0 5.438 12 6.57 6.57 0 0 0 12 18.563 6.57 6.57 0 0 0 18.563 12c0-.872-.179-1.706-.488-2.466h3.581v9.825Z"
										/></g
									><defs><clipPath id="a"><path fill="#fff" d="M0 0h24v24H0z" /></clipPath></defs
									></svg
								>
							</a>
							<a href={blok.ig_link.cached_url} aria-label="Bandcamp" class="block">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									class="h-8 w-auto"
									viewBox="0 0 24 24"
									><g clip-path="url(#a)"
										><path
											fill="#E7E1DA"
											d="M19.36 0H4.64A4.645 4.645 0 0 0 0 4.64V19.37c0 2.56 2.081 4.64 4.64 4.64h14.72c2.559 0 4.64-2.08 4.64-4.64V4.63C23.99 2.081 21.91 0 19.36 0Zm1.33 2.766h.535V6.834l-4.06.01-.009-4.069 3.535-.01ZM8.57 9.534a4.233 4.233 0 0 1 3.422-1.762c1.406 0 2.653.694 3.421 1.762.507.694.797 1.547.797 2.466a4.235 4.235 0 0 1-4.228 4.228c-2.334 0-4.21-1.903-4.21-4.228 0-.919.3-1.772.798-2.466Zm13.087 9.825a2.3 2.3 0 0 1-2.297 2.297H4.641a2.3 2.3 0 0 1-2.297-2.297V9.534h3.581A6.532 6.532 0 0 0 5.438 12 6.57 6.57 0 0 0 12 18.563 6.57 6.57 0 0 0 18.563 12c0-.872-.179-1.706-.488-2.466h3.581v9.825Z"
										/></g
									><defs><clipPath id="a"><path fill="#fff" d="M0 0h24v24H0z" /></clipPath></defs
									></svg
								>
							</a>
							<a href={blok.ig_link.cached_url} aria-label="Spotify" class="block">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									class="h-8 w-auto"
									viewBox="0 0 24 24"
									><g clip-path="url(#a)"
										><path
											fill="#E7E1DA"
											d="M19.36 0H4.64A4.645 4.645 0 0 0 0 4.64V19.37c0 2.56 2.081 4.64 4.64 4.64h14.72c2.559 0 4.64-2.08 4.64-4.64V4.63C23.99 2.081 21.91 0 19.36 0Zm1.33 2.766h.535V6.834l-4.06.01-.009-4.069 3.535-.01ZM8.57 9.534a4.233 4.233 0 0 1 3.422-1.762c1.406 0 2.653.694 3.421 1.762.507.694.797 1.547.797 2.466a4.235 4.235 0 0 1-4.228 4.228c-2.334 0-4.21-1.903-4.21-4.228 0-.919.3-1.772.798-2.466Zm13.087 9.825a2.3 2.3 0 0 1-2.297 2.297H4.641a2.3 2.3 0 0 1-2.297-2.297V9.534h3.581A6.532 6.532 0 0 0 5.438 12 6.57 6.57 0 0 0 12 18.563 6.57 6.57 0 0 0 18.563 12c0-.872-.179-1.706-.488-2.466h3.581v9.825Z"
										/></g
									><defs><clipPath id="a"><path fill="#fff" d="M0 0h24v24H0z" /></clipPath></defs
									></svg
								>
							</a>
							<a href={blok.ig_link.cached_url} aria-label="YouTube" class="block">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									class="h-8 w-auto"
									viewBox="0 0 24 24"
									><g clip-path="url(#a)"
										><path
											fill="#E7E1DA"
											d="M19.36 0H4.64A4.645 4.645 0 0 0 0 4.64V19.37c0 2.56 2.081 4.64 4.64 4.64h14.72c2.559 0 4.64-2.08 4.64-4.64V4.63C23.99 2.081 21.91 0 19.36 0Zm1.33 2.766h.535V6.834l-4.06.01-.009-4.069 3.535-.01ZM8.57 9.534a4.233 4.233 0 0 1 3.422-1.762c1.406 0 2.653.694 3.421 1.762.507.694.797 1.547.797 2.466a4.235 4.235 0 0 1-4.228 4.228c-2.334 0-4.21-1.903-4.21-4.228 0-.919.3-1.772.798-2.466Zm13.087 9.825a2.3 2.3 0 0 1-2.297 2.297H4.641a2.3 2.3 0 0 1-2.297-2.297V9.534h3.581A6.532 6.532 0 0 0 5.438 12 6.57 6.57 0 0 0 12 18.563 6.57 6.57 0 0 0 18.563 12c0-.872-.179-1.706-.488-2.466h3.581v9.825Z"
										/></g
									><defs><clipPath id="a"><path fill="#fff" d="M0 0h24v24H0z" /></clipPath></defs
									></svg
								>
							</a>
							<a href={blok.bit_link.cached_url} aria-label="BandIsInTown" class="block">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									class="h-12 w-auto"
									viewBox="0 0 48 32"
									><path
										fill="#E7E1DA"
										d="M7.022 25.117h-.013v.431H6.38v-4.436h.628v1.94h.013c.19-.317.512-.526 1-.526.783 0 1.443.582 1.443 1.558 0 .977-.66 1.56-1.443 1.56-.488 0-.814-.21-1-.527Zm1.776-1.035c0-.558-.359-.95-.91-.95-.552 0-.91.392-.91.95 0 .557.355.953.91.953.554 0 .91-.392.91-.95v-.003ZM9.897 24.085c0-.976.66-1.559 1.443-1.559.488 0 .814.21 1.001.526h.012v-.43h.63v2.927h-.63v-.432h-.012c-.19.318-.513.526-1.001.526-.782 0-1.443-.582-1.443-1.558Zm2.489 0c0-.557-.36-.95-.91-.95-.552 0-.913.393-.913.95 0 .557.36.95.912.95s.908-.392.908-.95h.003ZM16.468 23.748v1.8h-.628v-1.695c0-.5-.256-.71-.68-.71-.461 0-.79.273-.79 1.001v1.4h-.628v-2.926h.629v.443h.013a1.042 1.042 0 0 1 .968-.538c.635.002 1.116.338 1.116 1.225ZM17.035 24.085c0-.976.66-1.558 1.443-1.558.488 0 .815.209 1 .526h.014v-1.94h.627v4.436h-.627v-.431h-.014c-.185.317-.512.526-1 .526-.783 0-1.443-.582-1.443-1.558Zm2.488 0c0-.557-.359-.95-.91-.95-.552 0-.911.393-.911.95 0 .558.36.951.91.951.552 0 .914-.392.914-.95h-.003ZM20.625 25.333l.286-.55c.283.175.609.273.943.282.3 0 .46-.089.46-.273 0-.12-.063-.21-.313-.33l-.539-.26c-.448-.208-.622-.506-.622-.847 0-.539.404-.83 1.048-.83.354.007.703.084 1.026.228l-.256.538a2.06 2.06 0 0 0-.789-.188c-.276 0-.366.09-.366.222 0 .133.084.228.34.349l.552.26c.38.177.59.43.59.824 0 .596-.462.886-1.154.886-.422 0-.838-.107-1.206-.311ZM23.537 22.621h.629v2.927h-.629v-2.927ZM23.85 21.933a.38.38 0 0 0 .383-.377.38.38 0 0 0-.382-.377.38.38 0 0 0-.382.377.38.38 0 0 0 .382.377ZM27.664 23.749v1.8h-.629v-1.695c0-.5-.256-.71-.68-.71-.461 0-.789.273-.789 1.001v1.4h-.628V22.62h.628v.443h.014c.094-.17.234-.311.405-.406.171-.096.366-.141.562-.133.636.003 1.117.34 1.117 1.226ZM29.208 23.146v1.534c0 .21.09.304.308.304h.153v.57h-.285c-.52 0-.802-.271-.802-.752v-1.656h-.525v-.525h.52v-1.173h.628v1.173h.61v.525h-.607ZM33.286 24.085c0 .9-.694 1.558-1.62 1.558-.926 0-1.62-.658-1.62-1.558s.693-1.559 1.62-1.559c.927 0 1.62.66 1.62 1.559Zm-2.579 0c0 .577.392.95.953.95.56 0 .952-.376.952-.95s-.39-.95-.952-.95c-.563 0-.953.373-.953.95ZM37.978 22.621l-.995 2.927h-.577l-.705-2.097-.712 2.097h-.578l-.993-2.927h.693l.596 2.11.686-2.11h.614l.686 2.11.597-2.11h.688ZM41.125 23.75v1.799h-.629v-1.694c0-.501-.256-.711-.68-.711-.461 0-.789.273-.789 1.001v1.4h-.629V22.62h.63v.443h.013c.094-.17.234-.31.405-.404.171-.095.366-.14.561-.132.637 0 1.118.337 1.118 1.223ZM23.29 6.49h-2.78v3.662h2.78V6.49ZM26.996 6.49h-2.78v3.662h2.78V6.49ZM30.701 3.744h-2.78v6.408h2.78V3.744Z"
									/><path
										fill="#E7E1DA"
										d="M20.51 11.067v2.747h7.412v.916h-8.339V3.744h-2.778v13.732h13.897v-6.409H20.51Z"
									/></svg
								>
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
					<div>
						<div>
							<p class="font-header text-2xl font-semibold text-primary-text-light uppercase">
								Hath is:
							</p>
							<ul class="mt-4">
								<li class="text-xl text-secondary-text-light">Skronk Lord - Drums</li>
								<li class="mt-2 text-xl text-secondary-text-light">Fronk - Vocals / Guitar</li>
								<li class="mt-2 text-xl text-secondary-text-light">Peanut Butter - Guitar</li>
								<li class="mt-2 text-xl text-secondary-text-light">Greg - Bass</li>
							</ul>
						</div>
						<div class="mt-12">
							<p class="font-header text-2xl font-semibold text-primary-text-light uppercase">
								Booking & Press
							</p>
							<a
								href={blok.booking_email.cached_url}
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
