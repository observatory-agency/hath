<script>
	export let text;
	export let href;
	export let target;
	export let rel;
</script>

<a
	{href}
	{target}
	{rel}
	class="w-fit cursor-pointer rounded-xs bg-primary-color px-10 py-4 font-header text-2xl leading-none text-primary-text-light uppercase transition-colors duration-300 hover:bg-bg-dark"
>
	{text}
</a>
