<script>
	import { hasBanner } from '$lib/stores/banner.js';
	import { onMount } from 'svelte';

	let scrollY = 0;
	let isScrolled = false;

	onMount(() => {
		const updateScroll = () => {
			scrollY = window.scrollY;
			isScrolled = scrollY > 100; // Trigger at 100px scroll
		};

		window.addEventListener('scroll', updateScroll);
		return () => window.removeEventListener('scroll', updateScroll);
	});
</script>

<header
	class="fixed right-0 left-0 z-50 transition-all duration-300"
	class:pt-[96px]={$hasBanner && !isScrolled}
	class:bg-white={isScrolled}
	class:shadow-lg={isScrolled}
>
	<nav
		aria-label="Global"
		class="container mx-auto flex items-center justify-between transition-all duration-300"
		class:p-6={!isScrolled}
		class:lg:px-8={!isScrolled}
		class:p-8={isScrolled}
		class:lg:px-6={isScrolled}
	>
		<div class="flex flex-1">
			<div class="hidden lg:flex lg:gap-x-12">
				<a
					href="#releases"
					class="font-header text-lg font-semibold uppercase transition-colors duration-300"
					class:text-white={!isScrolled}
					class:text-gray-900={isScrolled}>Releases</a
				>
				<a
					href="#store"
					class="font-header text-lg font-semibold uppercase transition-colors duration-300"
					class:text-white={!isScrolled}
					class:text-gray-900={isScrolled}>Store</a
				>
				<a
					href="#shows"
					class="font-header text-lg font-semibold uppercase transition-colors duration-300"
					class:text-white={!isScrolled}
					class:text-gray-900={isScrolled}>Shows</a
				>
				<a
					href="#contact"
					class="font-header text-lg font-semibold uppercase transition-colors duration-300"
					class:text-white={!isScrolled}
					class:text-gray-900={isScrolled}>Contact</a
				>
			</div>
			<div class="flex lg:hidden">
				<button
					type="button"
					command="show-modal"
					commandfor="mobile-menu"
					class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 transition-colors duration-300"
					class:text-white={!isScrolled}
					class:text-gray-700={isScrolled}
				>
					<span class="sr-only">Open main menu</span>
					<svg
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
						data-slot="icon"
						aria-hidden="true"
						class="size-6"
					>
						<path
							d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</button>
			</div>
		</div>
		<a
			href="/"
			class="absolute left-1/2 -translate-x-1/2 transition-all duration-300"
			class:top-28={!isScrolled}
			class:top-3={isScrolled}
		>
			<span class="sr-only">Hath</span>
			<img
				src={!isScrolled ? '/logo-gold.png' : '/logo-black.png'}
				alt=""
				class="transition-all duration-300"
				class:w-72={!isScrolled}
				class:w-24={isScrolled}
			/>
		</a>
		<div class="flex flex-1 justify-end">
			<div class="flex items-center justify-end space-x-8">
				<div class="hidden cursor-pointer items-center space-x-2 sm:flex">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-7 w-7 transition-colors duration-300"
						class:text-white={!isScrolled}
						class:text-gray-900={isScrolled}
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<button
						class="snipcart-customer-signin font-medium uppercase transition-colors duration-300"
						class:text-white={!isScrolled}
						class:text-gray-900={isScrolled}
					>
						account
					</button>
				</div>
				<div class="hidden">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="text-replicant-100 h-6 w-6 cursor-pointer"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				</div>

				<div class="snipcart-checkout flex cursor-pointer items-center space-x-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-7 w-7 transition-colors duration-300"
						class:text-white={!isScrolled}
						class:text-gray-900={isScrolled}
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
						/>
					</svg>
					<button
						class="font-medium transition-colors duration-300"
						class:text-white={!isScrolled}
						class:text-gray-900={isScrolled}
					>
						<span class="hidden uppercase sm:inline-block">bag</span>
						<span
							class="text-tertiaryColor snipcart-items-count ml-2 text-sm font-medium group-hover:text-gray-800"
						></span>
					</button>
				</div>
			</div>
		</div>
	</nav>
	<div>
		<div id="mobile-menu" class="hidden backdrop:bg-transparent">
			<div class="fixed inset-0 focus:outline-none">
				<div
					class="fixed inset-y-0 left-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 dark:bg-gray-900"
				>
					<div class="flex items-center justify-between">
						<div class="flex flex-1">
							<button
								type="button"
								command="close"
								commandfor="mobile-menu"
								class="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-400 dark:hover:text-white"
							>
								<span class="sr-only">Close menu</span>
								<svg
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="1.5"
									data-slot="icon"
									aria-hidden="true"
									class="size-6"
								>
									<path d="M6 18 18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" />
								</svg>
							</button>
						</div>
						<a href="#" class="-m-1.5 p-1.5">
							<span class="sr-only">Your Company</span>
							<img
								src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
								alt=""
								class="h-8 w-auto dark:hidden"
							/>
							<img
								src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
								alt=""
								class="h-8 w-auto not-dark:hidden"
							/>
						</a>
						<div class="flex flex-1 justify-end">
							<a href="#" class="text-sm/6 font-semibold text-gray-900 dark:text-white"
								>Log in <span aria-hidden="true">&rarr;</span></a
							>
						</div>
					</div>
					<div class="mt-6 space-y-2">
						<a
							href="#"
							class="-mx-3 block rounded-lg px-3 py-2 font-header text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
							>Product</a
						>
						<a
							href="#"
							class="-mx-3 block rounded-lg px-3 py-2 font-header text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
							>Features</a
						>
						<a
							href="#"
							class="-mx-3 block rounded-lg px-3 py-2 font-header text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
							>Company</a
						>
					</div>
				</div>
			</div>
		</div>
	</div>
</header>
