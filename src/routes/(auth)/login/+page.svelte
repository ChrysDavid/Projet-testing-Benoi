<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { pb } from "$lib";
	import { ClientResponseError } from "pocketbase";
	import { onMount } from "svelte";

    let username: HTMLInputElement;
    let usernameInvalid: boolean = $state<boolean>(false);
    let password: HTMLInputElement;
    let passwordInvalid: boolean = $state<boolean>(false);
    let loading: boolean = $state<boolean>(false);
    let authentificationError: boolean = $state<boolean>(false);
    
    onMount(() => {
        if(pb.authStore.isValid) {
            goto('/');
        }
    });
    
    async function onsubmit(event: SubmitEvent) {
        event.preventDefault();
        if(username.value === '')
        {
            usernameInvalid = true;
            return;
        }
        else usernameInvalid = false;

        if(password.value === '')
        {
            usernameInvalid = false;
            return;
        }
        else passwordInvalid = false;

        loading = true;
        try {
            await pb.collection('users').authWithPassword(
                username.value,
                password.value,
            );
        } catch (error) {
            if(error instanceof ClientResponseError) {
                if(error as ClientResponseError) {
                    if(error.status === 400) {
                        console.log('Mot de passe ou pseudo incorrect');
                        password.value = '';
                    }
                }
            }
        }
        loading = false;
        if(pb.authStore.isValid) {
            const params: URLSearchParams = $page.url.searchParams;
            document.cookie = pb.authStore.exportToCookie();
            if(params.has('redirect')) {
                document.cookie = pb.authStore.exportToCookie();
                goto(params.get('redirect')!);
            } else {
                document.cookie = pb.authStore.exportToCookie();
                goto('/');
            }
        }
    }
</script>

<div class="flex flex-col flex-1 items-center justify-center">
    <form class="card bg-base-100 w-96 shadow-xl" {onsubmit}>
        <div class="card-body form-control">
            <h2 class="card-title">Connexion</h2>
            <label class="input input-bordered flex items-center gap-2">
                Pseudo
                <input id="username" type="text" class="grow" bind:this="{username}"/>
            </label>
            <label class="input input-bordered flex items-center gap-2">
                Mot de passe
                <input id="password" type="password" class="grow" bind:this="{password}"/>
            </label>
            {#if loading === false}
                <input type="submit" value="Connexion" class="btn btn-primary w-full" />
            {:else}
                <input type="submit" value="Connexion" class="btn btn-primary w-full" disabled/>
            {/if}
        </div>
    </form>
</div>
