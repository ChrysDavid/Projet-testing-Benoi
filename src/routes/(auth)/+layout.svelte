<script lang="ts">
	import "../../app.css";
	let { children } = $props();
</script>

<div class="flex flex-col min-h-screen">
    <nav class="navbar bg-base-200">
        <div class="flex-1">
            <a class="btn btn-ghost text-xl" href="/">TableRonde</a>
        </div>
    </nav>
    {@render children?.()}
</div>