<script>
	import ButtonGhost from '$lib/components/ui/ButtonGhost.svelte';
</script>

<form action="" class="mt-8 flex w-full max-w-md flex-col gap-4 gap-x-4 sm:flex-row">
	<label for="email-address" class="sr-only">Email address</label>
	<input
		id="email-address"
		type="email"
		name="email"
		required
		placeholder="Enter your email"
		autocomplete="email"
		class="min-w-0 flex-auto rounded-md bg-white px-3.5 py-2 text-base text-primary-text/70 outline-1 -outline-offset-1 outline-primary-text/70 placeholder:text-primary-text/70 focus:outline-2 focus:-outline-offset-2 focus:outline-secondary-text-light sm:text-sm/6"
	/>
	<ButtonGhost text="Subscribe" type="submit" />
</form>
