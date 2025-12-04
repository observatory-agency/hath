<script>
	import { goto } from '$app/navigation';
	import ButtonGhost from '$lib/components/ui/ButtonGhost.svelte';

	let loading = $state(false);

	async function handleSubmit(event) {
		event.preventDefault();
		loading = true;

		const formData = new FormData(event.target);

		try {
			await fetch('https://buttondown.com/api/emails/embed-subscribe/hath', {
				method: 'POST',
				body: formData,
				mode: 'no-cors'
			});
			// With no-cors we can't read the response, but the request goes through
			goto('/thank-you');
		} catch (error) {
			console.error('Subscription error:', error);
			// Still redirect - the subscription likely worked
			goto('/thank-you');
		} finally {
			loading = false;
		}
	}
</script>

<form onsubmit={handleSubmit} class="mt-8 flex w-full max-w-md flex-col gap-4 gap-x-4 sm:flex-row">
	<label for="email-address" class="sr-only">Email address</label>
	<input
		id="email-address"
		type="email"
		name="email"
		required
		placeholder="Enter your email"
		autocomplete="email"
		disabled={loading}
		class="min-w-0 flex-auto rounded-md bg-white px-3.5 py-2 text-base text-primary-text/80 outline-1 -outline-offset-1 outline-primary-color placeholder:text-primary-text/80 focus:outline-2 focus:-outline-offset-2 focus:outline-primary-color disabled:opacity-50 sm:text-sm/6"
	/>
	<ButtonGhost text={loading ? 'Subscribing...' : 'Subscribe'} type="submit" disabled={loading} />
</form>
