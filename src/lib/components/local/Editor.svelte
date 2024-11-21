<script lang="ts">
	import Quill from "quill";
	import { onMount } from "svelte";

	let quill: any;
	

	onMount(() => {
		quill = new Quill("#editor", {
			theme: "snow",
			modules: {
				toolbar: [
					[{ header: [1, 2, false] }],
					['bold', 'italic', 'underline'],
					['image', 'code-block'],
				]
			}
		});
	});
</script>
  
<link href="/quill.snow.css" rel="stylesheet" />
<div id="editor">
	<p>Hello World!</p>
	<p>Some initial <strong>bold</strong> text</p>
	<p><br /></p>
</div>