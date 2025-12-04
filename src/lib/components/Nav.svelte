<script>
	import { hasBanner, isMobileMenuOpen } from '$lib/stores/banner.js';
	import { onMount } from 'svelte';

	let scrollY = 0;
	let isScrolled = false;

	onMount(() => {
		const updateScroll = () => {
			scrollY = window.scrollY;
			// Use 50px threshold for mobile, 100px for desktop
			const threshold = window.innerWidth < 1024 ? 60 : 100;
			isScrolled = scrollY > threshold;
		};

		window.addEventListener('scroll', updateScroll);
		window.addEventListener('resize', updateScroll); // Update on resize
		return () => {
			window.removeEventListener('scroll', updateScroll);
			window.removeEventListener('resize', updateScroll);
		};
	});

	function toggleMobileMenu() {
		isMobileMenuOpen.update((value) => !value);
		// Prevent body scroll when menu is open
		const unsubscribe = isMobileMenuOpen.subscribe((value) => {
			if (value) {
				document.body.style.overflow = 'hidden';
			} else {
				document.body.style.overflow = '';
			}
		});
		unsubscribe();
	}

	function closeMobileMenu() {
		isMobileMenuOpen.set(false);
		document.body.style.overflow = '';
	}
</script>

<header
	class="nav-boi fixed right-0 left-0 z-10 transition-all duration-300"
	class:pt-[96px]={$hasBanner && !isScrolled}
	class:bg-white={isScrolled}
	class:shadow-lg={isScrolled}
>
	<nav
		aria-label="Global"
		class="max-w-[1536px]mx-auto flex items-center justify-between transition-all duration-300"
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
					class:text-gray-900={isScrolled}>Music</a
				>
				<a
					href="#store"
					class="font-header text-lg font-semibold uppercase transition-colors duration-300"
					class:text-white={!isScrolled}
					class:text-gray-900={isScrolled}>Merch</a
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
					on:click={toggleMobileMenu}
					class="-m-2.5 inline-flex cursor-pointer items-center justify-center rounded-md p-2.5 transition-colors duration-300"
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
				class:w-40={!isScrolled}
				class:w-20={isScrolled}
				class:lg:w-72={!isScrolled}
				class:lg:w-24={isScrolled}
			/>
		</a>
		<div class="flex flex-1 justify-end">
			<div class="flex items-center justify-end space-x-8">
				<button
					type="button"
					class="snipcart-customer-signin hidden cursor-pointer items-center space-x-2 sm:flex"
				>
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
					<span
						class="hidden font-medium uppercase transition-colors duration-300 md:inline-block"
						class:text-white={!isScrolled}
						class:text-gray-900={isScrolled}
					>
						account
					</span>
				</button>
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
						class="cursor-pointer font-medium transition-colors duration-300"
						class:text-white={!isScrolled}
						class:text-gray-900={isScrolled}
					>
						<span class="hidden uppercase md:inline-block">bag</span>
						<span
							class="text-tertiaryColor snipcart-items-count ml-2 text-sm font-medium group-hover:text-gray-800"
						></span>
					</button>
				</div>
			</div>
		</div>
	</nav>
	<!-- Mobile menu overlay -->
	<div
		class="fixed inset-0 z-20 transition-all duration-300 lg:hidden"
		class:opacity-100={$isMobileMenuOpen}
		class:opacity-0={!$isMobileMenuOpen}
		class:pointer-events-auto={$isMobileMenuOpen}
		class:pointer-events-none={!$isMobileMenuOpen}
	>
		<!-- Backdrop -->
		<div
			class="fixed inset-0 bg-black transition-opacity duration-300"
			class:bg-opacity-50={$isMobileMenuOpen}
			class:bg-opacity-0={!$isMobileMenuOpen}
			on:click={closeMobileMenu}
			on:keydown={(e) => e.key === 'Escape' && closeMobileMenu()}
			role="button"
			tabindex="0"
		></div>

		<!-- Mobile menu panel -->
		<div
			class="fixed inset-y-0 left-0 z-30 w-80 max-w-sm transform bg-white shadow-xl transition-transform duration-300 ease-in-out"
			class:translate-x-0={$isMobileMenuOpen}
			class:-translate-x-full={!$isMobileMenuOpen}
		>
			<div class="flex h-full flex-col overflow-y-auto">
				<!-- Header -->
				<div class="flex items-center justify-between px-6 py-6">
					<a href="/" on:click={closeMobileMenu}>
						<span class="sr-only">Hath</span>
						<img src="/logo-black.png" alt="Hath" class="h-12 w-auto" />
					</a>
					<button
						type="button"
						on:click={closeMobileMenu}
						class="-m-2.5 rounded-md p-2.5 text-gray-700 hover:text-gray-900"
					>
						<span class="sr-only">Close menu</span>
						<svg
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="1.5"
							aria-hidden="true"
							class="h-6 w-6"
						>
							<path d="M6 18 18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" />
						</svg>
					</button>
				</div>

				<!-- Navigation Links -->
				<div class="flex-1 px-6 pb-6">
					<nav class="space-y-2">
						<a
							href="#releases"
							on:click={closeMobileMenu}
							class="block rounded-lg px-3 py-3 font-header text-lg font-semibold text-gray-900 uppercase transition-colors duration-200 hover:bg-gray-50"
						>
							Music
						</a>
						<a
							href="#store"
							on:click={closeMobileMenu}
							class="block rounded-lg px-3 py-3 font-header text-lg font-semibold text-gray-900 uppercase transition-colors duration-200 hover:bg-gray-50"
						>
							Merch
						</a>
						<a
							href="#shows"
							on:click={closeMobileMenu}
							class="block rounded-lg px-3 py-3 font-header text-lg font-semibold text-gray-900 uppercase transition-colors duration-200 hover:bg-gray-50"
						>
							Shows
						</a>
						<a
							href="#contact"
							on:click={closeMobileMenu}
							class="block rounded-lg px-3 py-3 font-header text-lg font-semibold text-gray-900 uppercase transition-colors duration-200 hover:bg-gray-50"
						>
							Contact
						</a>
					</nav>

					<!-- Account and Cart Actions -->
					<div class="mt-8 space-y-4 border-t border-gray-200 pt-6">
						<button
							type="button"
							class="snipcart-customer-signin flex w-full cursor-pointer items-center space-x-3 rounded-lg py-3 pr-3 transition-colors duration-200 hover:bg-gray-50"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-6 w-6 text-gray-700"
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
							<span class="font-medium text-gray-900 uppercase transition-colors duration-200">
								Account
							</span>
						</button>
						<div class="snipcart-checkout flex items-center space-x-3">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-6 w-6 text-gray-700"
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
								class="font-medium text-gray-900 transition-colors duration-200 hover:text-gray-700"
							>
								<span class="uppercase">Bag</span>
								<span class="snipcart-items-count ml-2 text-sm font-medium"></span>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</header>
