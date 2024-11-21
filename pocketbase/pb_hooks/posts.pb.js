/// <reference path="../pb_data/types.d.ts" />

routerAdd("GET", "/api/post/:id", (c) => {
    const id = c.pathParam("id");
    if(id !== "") {
        try {
            const result = $app.dao().findRecordById("posts", id);
            return c.json(200, result );
        }
        catch {
            
        }
    }
    return c.noContent(404);
});

routerAdd("POST", "/api/post/create", (c) => {
    const info = $apis.requestInfo(c);
    if(info.data.title === "" || info.data.content === "") {
        return c.json(400, {error: "Invalid data"});
    } else {
        const collection = $app.dao().findCollectionByNameOrId("posts");
        const post = new Record(collection, {
            "title": info.data.title,
            "author": info.authRecord.id,
            "content": info.data.content,
            "status": "public"
        });
        $app.dao().saveRecord(post);
        return c.json(200, post.id);
    }
}, $apis.requireRecordAuth())

routerAdd("GET", "/api/posts", (c) => {
    let page = 1;
    let qPage = c.queryParam("page");
    if(qPage !== "") {
        page = parseInt(qPage);
    }
    const result = $app.dao().findRecordsByFilter(
        "posts",
        "status = 'public'",
        "-updated",
        15,
        page - 1);
    let posts = [];
    result.forEach((record) => {
        
        posts.push({
            id: record.get("id"),
            created: record.get("created"),
            updated: record.get("updated"),
            title: record.get("title"),
            author: $app.dao().findRecordById("users", record.get("author")).username(),
            content: record.get("content"),
            status: record.get("status")
        });
    });
    return c.json(200, posts );
});