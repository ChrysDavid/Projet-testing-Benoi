import { Post } from "$lib";
import PocketBase from "pocketbase"

export async function load(event) {
    const auth = event.cookies.get("pb_auth");
    const pb = ((event as any).pbClient as PocketBase);
    if(pb !== undefined) {
        try {
            let result = await pb.send("api/posts", {
                method: "GET"
            });
            let posts: Post[] = []
            return {
                posts: result
            }
        } catch (error: any) {
            
        }
    }
    /*if(auth !== undefined) {
        pb.authStore.loadFromCookie(auth);
        console.log(auth);
        console.log(pb.authStore.isValid);
    } else {
        console.log("Not logged in");
    }*/
}