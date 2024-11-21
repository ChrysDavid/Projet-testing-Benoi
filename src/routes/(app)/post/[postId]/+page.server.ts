import { Post } from "$lib";
import PocketBase from "pocketbase"

export async function load(event) {
    const auth = event.cookies.get("pb_auth");
    if(event.params.postId !== undefined) {
        const pb = ((event as any).pbClient as PocketBase);
        try {
            let result = await pb.send("api/post/" + event.params.postId, {
                method: "GET"
            });
            //let post = new Post(result.author, result.title, result.content, result.status, result.created, result.updated);
            let comments: any[] = []
            try {

            }
            catch (error: any) {
                }
            return {
                post: result,
                comments: comments
            }
        } catch (error: any) {
            
        }
    } else {
        return {
            status: 404,
            messafe: "Post not found"
        }
    }
}