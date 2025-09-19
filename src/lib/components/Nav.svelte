<script>
	import { hasBanner } from '$lib/stores/banner.js';
</script>

<header class="right-0 left-0 z-50 {$hasBanner ? 'top-16' : 'top-0'}">
	<nav aria-label="Global" class="container flex justify-between items-center p-6 mx-auto lg:px-8">
		<div class="flex flex-1">
			<div class="hidden lg:flex lg:gap-x-12">
				<a
					href="#releases"
					class="text-lg font-semibold text-white uppercase font-header dark:text-white">Releases</a
				>
				<a
					href="#store"
					class="text-lg font-semibold text-white uppercase font-header dark:text-white">Store</a
				>
				<a
					href="#shows"
					class="text-lg font-semibold text-white uppercase font-header dark:text-white">Shows</a
				>
				<a
					href="#contact"
					class="text-lg font-semibold text-white uppercase font-header dark:text-white">Contact</a
				>
			</div>
			<div class="flex lg:hidden">
				<button
					type="button"
					command="show-modal"
					commandfor="mobile-menu"
					class="inline-flex justify-center items-center p-2.5 -m-2.5 text-gray-700 rounded-md dark:text-gray-400 dark:hover:text-white"
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
		<a href="/" class="absolute top-12 left-1/2 -translate-x-1/2">
			<span class="sr-only">Hath</span>
			<img src="/logo-gold.png" alt="" class="w-72" />
		</a>
		<div class="flex flex-1 justify-end">
			<div class="flex justify-end items-center space-x-8">
				<div class="hidden items-center space-x-2 cursor-pointer sm:flex">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="w-7 h-7 text-white"
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
					<button class="font-medium text-white uppercase snipcart-customer-signin">
						account
					</button>
				</div>
				<div class="hidden">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="w-6 h-6 cursor-pointer text-replicant-100"
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

				<div class="flex items-center space-x-2 cursor-pointer snipcart-checkout">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="w-7 h-7 text-white"
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
					<button class="font-medium text-white">
						<span class="hidden uppercase sm:inline-block">bag</span>
						<span
							class="ml-2 text-sm font-medium text-tertiaryColor snipcart-items-count group-hover:text-gray-800"
						/>
					</button>
				</div>
			</div>
		</div>
	</nav>
	<div>
		<div id="mobile-menu" class="hidden backdrop:bg-transparent">
			<div class="fixed inset-0 focus:outline-none">
				<div
					class="overflow-y-auto fixed inset-y-0 left-0 z-10 px-6 py-6 w-full bg-white dark:bg-gray-900"
				>
					<div class="flex justify-between items-center">
						<div class="flex flex-1">
							<button
								type="button"
								command="close"
								commandfor="mobile-menu"
								class="p-2.5 -m-2.5 text-gray-700 rounded-md dark:text-gray-400 dark:hover:text-white"
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
						<a href="#" class="p-1.5 -m-1.5">
							<span class="sr-only">Your Company</span>
							<img
								src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
								alt=""
								class="w-auto h-8 dark:hidden"
							/>
							<img
								src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
								alt=""
								class="w-auto h-8 not-dark:hidden"
							/>
						</a>
						<div class="flex flex-1 justify-end">
							<a href="#" class="font-semibold text-gray-900 text-sm/6 dark:text-white"
								>Log in <span aria-hidden="true">&rarr;</span></a
							>
						</div>
					</div>
					<div class="mt-6 space-y-2">
						<a
							href="#"
							class="block px-3 py-2 -mx-3 font-semibold text-gray-900 rounded-lg font-header text-base/7 hover:bg-gray-50"
							>Product</a
						>
						<a
							href="#"
							class="block px-3 py-2 -mx-3 font-semibold text-gray-900 rounded-lg font-header text-base/7 hover:bg-gray-50"
							>Features</a
						>
						<a
							href="#"
							class="block px-3 py-2 -mx-3 font-semibold text-gray-900 rounded-lg font-header text-base/7 hover:bg-gray-50"
							>Company</a
						>
					</div>
				</div>
			</div>
		</div>
	</div>
</header>
