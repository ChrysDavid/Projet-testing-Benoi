import PocketBase from "pocketbase"

export { Post } from "./post"

export const pb = new PocketBase("http://127.0.0.1:8090")

export function pbApiRoute(path: string) {
    return `${pb.baseUrl}/api/${path}`
}