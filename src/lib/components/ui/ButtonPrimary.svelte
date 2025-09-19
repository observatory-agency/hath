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
	class="px-10 py-4 text-2xl leading-none uppercase transition-colors duration-300 cursor-pointer w-fit rounded-xs bg-primary-color font-header text-primary-text-light hover:bg-bg-dark"
>
	{text}
</a>
