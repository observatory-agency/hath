<script>
	export let text;
	export let href = '/';
	export let target;
	export let rel;
</script>

<a
	{href}
	{target}
	{rel}
	class="cursor-pointer rounded-sm border border-primary-text-light bg-transparent px-8 pt-4 pb-3 font-header text-lg text-primary-text-light uppercase transition-colors duration-300 hover:bg-primary-text-light hover:text-primary-text focus:outline-2 focus:-outline-offset-2 focus:outline-primary-color disabled:cursor-not-allowed disabled:opacity-50"
>
	{text}
</a>
