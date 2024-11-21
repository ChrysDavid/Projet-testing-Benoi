import type { RequestEvent } from "@sveltejs/kit";
import PocketBase from "pocketbase";

export async function handle( {event, resolve }) {
    (event as any).pbClient = new PocketBase("http://127.0.0.1:8090");
    if(event.cookies.get("pb_auth") !== undefined) {
        let cookieString = event.request.headers.get("cookie")!;
        ((event as any).pbClient as PocketBase).authStore.loadFromCookie(cookieString);
    }
    return await resolve(event);
}