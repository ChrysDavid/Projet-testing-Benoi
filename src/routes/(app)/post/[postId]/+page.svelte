<script lang="ts">
	import { page } from "$app/stores";

</script>

{#if $page.data.post != undefined}
    <div class="content prose px-8">
        {@html $page.data.post.content}
    </div>
{:else}
    <p>Post not found</p>
{/if}