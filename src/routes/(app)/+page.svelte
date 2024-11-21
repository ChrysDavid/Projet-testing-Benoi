<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
    import { pb, Post } from "$lib";
    import { onMount } from "svelte";

    let posts: Post[] = $state([]);
    onMount(async () => {
        if(!pb.authStore.isValid) {
            goto('/login?redirect=forum');
        } else {
            console.log($page.data.posts);
            for (let post of $page.data.posts) {
                posts.push(new Post(post.id, post.author, post.title, post.content, post.status, post.created, post.updated));
            }
            console.log(posts);
        }
        
    });
</script>

<div class="prose p-4">
    {#if posts.length === 0}
        <p>Aucun post</p>
    {/if}
    {#if pb.authStore.isValid}
        <a href="/new" class="btn btn-primary btn-sm">Nouveau post</a>
    {/if}
    <div class="flex flex-col w-screen gap-2">
        {#each posts as post}
            <a href="/post/{post.id}" class="flex flex-col flex-1 bg-base-200 rounded-md shadow-lg p-4">
                <p>{post.title}</p>
                <p>par {post.author}</p>
            </a>
        {/each}
    </div>
</div>
