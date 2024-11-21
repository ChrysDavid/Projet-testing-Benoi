export class Post {
    author: string;
    title: string;
    content: string;
    created: Date;
    updated: Date;
    id: string;
    status: "public" | "draft" | "private" | "deleted";

    constructor(id: string, author: string, title: string, content: string, status: "public" | "draft" | "private" | "deleted",created: string, updated: string) {
        this.id = id;
        this.author = author;
        this.title = title;
        this.content = content;
        this.status = status;
        this.created = new Date(created);
        this.updated = new Date(updated);
    }
}