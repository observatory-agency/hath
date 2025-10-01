<script>
	export let text;
	export let type;
</script>

<button
	{type}
	class="cursor-pointer rounded-sm border border-primary-text-light bg-transparent px-8 pt-2 pb-1 font-header text-lg text-primary-text-light uppercase transition-colors duration-300 hover:bg-primary-text-light hover:text-primary-text focus:outline-2 focus:-outline-offset-2 focus:outline-primary-color"
>
	{text}
</button>
