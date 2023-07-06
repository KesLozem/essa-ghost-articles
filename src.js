require("dotenv").config();
const GhostContentAPI = require('@tryghost/content-api');

const api = new GhostContentAPI({
    url: process.env.GHOST_SITE,
    key: process.env.CONTENT_KEY,
    version: "v5.0"
});

api.posts.browse({limit: 2})
.then((posts) => {
    posts.forEach((post) => {
        let json = {"title": post.title, "url": post.url, "date": post.created_at}
        console.log(JSON.stringify(json))
    });
})
.catch((err) => {
    console.error(err);
});