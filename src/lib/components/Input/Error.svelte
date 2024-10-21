<script>
	import { FieldErrors } from "formsnap";

	export let padded = false;
</script>

<FieldErrors 
	class="{padded ? "md:px-16" : "px-0"} text-xs text-lesser-light dark:text-lesser" 
/>