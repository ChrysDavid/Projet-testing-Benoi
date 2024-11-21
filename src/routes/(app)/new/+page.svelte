<script lang="ts">
	import { goto } from "$app/navigation";
	import { pb } from "$lib";
    import Editor from "$lib/components/local/Editor.svelte";
    let title: string = $state("");

    function post() {
        if(title !== "") {
            const content = document.querySelector(".ql-editor")?.innerHTML;
            if(content === undefined) {
                alert("Erreur inconnue");
                return;
            }
            pb.send("/api/post/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: title,
                    content: content
                })
            }).then(async (response) => {
                goto("/post/" + response);
            }).catch((error) => {
                console.error(error);
                alert("Erreur lors de la création du post");
            });
        } else {
            alert("Le titre ne peut pas être vide");
        }
    }
</script>

<div class="w-screen p-8">
    <form class="card bg-base-100 shadow-xl">
        <div class="card-body form-control">
            <h2 class="card-title">Nouveau post</h2>
            <div class="card-body">
                <label class="input input-bordered flex items-center gap-2">
                    Titre
                    <input type="text" class="grow" bind:value="{title}"/>
                </label>
                <Editor />
            </div>
            <div class="card-actions flex flex-row justify-between">
                <a class="btn btn-primary" href="/">Retour</a>
                <button class="btn btn-primary" onclick={post}>Poster</button>
            </div>
        </div>
    </form>
</div>