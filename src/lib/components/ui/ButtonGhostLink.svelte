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
	class="px-8 pt-2 pb-1 text-lg uppercase bg-transparent rounded-sm border transition-colors duration-300 cursor-pointer border-primary-text-light font-header text-primary-text-light hover:bg-primary-text-light hover:text-primary-text"
>
	{text}
</a>
