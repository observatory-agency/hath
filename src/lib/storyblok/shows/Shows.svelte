<script>
	import { storyblokEditable, StoryblokComponent } from '@storyblok/svelte';
	import { slide, fade, fly } from 'svelte/transition';
	import { quintOut, quintInOut, expoOut } from 'svelte/easing';
	import Show from './Show.svelte';

	export let blok;

	// State to track which show is expanded (only one at a time)
	let expandedShowIndex = 0; // Default to first show being open
	let isTransitioning = false;
	let showKey = 0; // Force recreation of Show component

	function toggleShow(index) {
		if (isTransitioning) return; // Prevent rapid clicking during transitions

		isTransitioning = true;
		expandedShowIndex = index;
		showKey++; // Increment to force recreation

		// Reset transition lock after animation completes
		setTimeout(() => {
			isTransitioning = false;
		}, 600);
	}
</script>

<div {...storyblokEditable(blok)} class="flex flex-col">
	{#each blok.shows as show, index}
		<div class="accordion-item relative {index === 0 ? '' : 'border-t border-primary-text-light'}">
			{#if expandedShowIndex === index}
				<!-- Expanded state: show full Show component -->
				<div
					class="overflow-hidden border-b border-primary-text-light"
					in:slide={{ duration: 1200, easing: quintInOut }}
					out:slide={{ duration: 900, easing: expoOut }}
				>
					{#key showKey}
						<Show blok={show} />
					{/key}
				</div>
			{:else}
				<!-- Collapsed state: show only title with plus icon -->
				<button
					class="group hover:bg-opacity-5 flex w-full cursor-pointer items-center justify-between border-b border-primary-text-light py-10 transition-all duration-500 ease-out hover:bg-primary-text-light/10 {isTransitioning
						? 'pointer-events-none opacity-75'
						: ''}"
					onclick={() => toggleShow(index)}
					type="button"
					in:slide={{ duration: 500, easing: quintInOut }}
					out:slide={{ duration: 300, easing: expoOut }}
				>
					<div class="overflow-hidden text-left">
						<p class="text-2xl font-normal text-primary-text-light">
							{show.title}
						</p>
					</div>
					<div class="relative flex h-8 w-8 items-center justify-center">
						<!-- Plus icon with enhanced animation -->
						<svg
							width="32"
							height="32"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							class="transform text-primary-text-light transition-all duration-500 ease-out group-hover:scale-110 group-hover:rotate-180 group-hover:text-white"
							in:fade={{ duration: 300, delay: 200 }}
						>
							<path
								d="M12 5V19M5 12H19"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
						<!-- Subtle background circle that appears on hover -->
						<div
							class="absolute inset-0 scale-75 rounded-full bg-primary-text-light opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:bg-black/70"
						></div>
					</div>
				</button>
			{/if}
		</div>
	{/each}
</div>
