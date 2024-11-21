<script lang="ts">
	import { beforeNavigate } from "$app/navigation";
	import { navigating } from "$app/stores";
    import "../../app.css";
	import { pb } from "$lib";

	let { children } = $props();
    let username: string = $state(pb.authStore.model?.username ?? "");

    function logout() {
        pb.authStore.clear();
        location.href = '/';
    }
    
    pb.authStore.onChange((token, model) => {
        document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
    })
    
</script>

<div>
    <nav class="navbar bg-base-200">
        <div class="flex-1">
            <a class="btn btn-ghost text-xl" href="/">TableRonde</a>
        </div>
        <div class="flex-none">
            {#if pb.authStore.isValid}
                <button class="btn btn-ghost" onclick="{logout}">Deconnexion</button>
            {:else}
                <a class="btn btn-ghost" href="/login">Se connecter</a>
                <a class="btn btn-ghost" href="/register">S'inscrire</a>
            {/if}
            <div class="dropdown dropdown-end">
                <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                    <div class="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS Navbar component"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>
                <ul
                    tabindex="0"
                    role='menu'
                    class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                    <li>
                    <a class="justify-between" href="/profile/{username}">
                        Profil
                    </a>
                    </li>
                    <li><a href="/settings">Paramètres</a></li>
                    <li><button onclick="{logout}">Logout</button></li>
                </ul>
            </div>
        </div>
    </nav>

    {@render children?.()}
</div>