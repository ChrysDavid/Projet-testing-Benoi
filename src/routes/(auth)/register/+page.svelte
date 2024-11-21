<script lang="ts">
	import { goto } from "$app/navigation";
	import { pb } from "$lib";
	import { ClientResponseError } from "pocketbase";
	import { onMount } from "svelte";

    let username: HTMLInputElement;
    let usernameInvalid: boolean = $state<boolean>(false);
    let email: HTMLInputElement;
    let emailInvalid: boolean = $state<boolean>(false);
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

        if(email.value === '')
        {
            emailInvalid = true;
            return;
        }
        else emailInvalid = false;

        if(password.value === '')
        {
            usernameInvalid = false;
            return;
        }
        else passwordInvalid = false;

        loading = true;
        const data = {
            "username": username.value,
            "email": email.value,
            "emailVisibility": true,
            "password": password.value,
            "passwordConfirm": password.value,
        };
        try {
            const record = await pb.collection('users').create(data);
            console.log(record);
        } catch (error) {
            if(error instanceof ClientResponseError) {
                if(error as ClientResponseError) {
                    if(error.status === 400) {
                        password.value = '';
                    }
                }
            }
        }
        loading = false;
        if(pb.authStore.isValid) {
            goto('/login');
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
                Email
                <input id="email" type="email" class="grow" bind:this="{email}"/>
            </label>
            <label class="input input-bordered flex items-center gap-2">
                Mot de passe
                <input id="password" type="password" class="grow" bind:this="{password}"/>
            </label>
            {#if loading === false}
                <input type="submit" value="S'inscrire" class="btn btn-primary w-full"/>
            {:else}
                <input type="submit" value="S'inscrire" class="btn btn-primary w-full" disabled/>
            {/if}
        </div>
    </form>
</div>
