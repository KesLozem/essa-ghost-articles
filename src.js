require("dotenv").config();
const GhostContentAPI = require('@tryghost/content-api');
const addPage = require("./gibbus.js"); // addPage function

const api = new GhostContentAPI({
    url: process.env.GHOST_SITE,
    key: process.env.CONTENT_KEY,
    version: "v5.0"
});

api.posts.browse({filter: 'primary_author:les-kosem', filter: 'primary_author:les-kosem', filter: 'primary_author:les-kosem', limit: 1, include: 'tags,authors'})
.then((posts) => {
    posts.forEach((post) => {
      let json = {"title": post.title, "url": post.url, "date": post.created_at, "content": post.html}
      // console.log(JSON.stringify(json))
      page = {
        properties: {
          title: post.title,
          author: post.primary_author.name,
          date: post.created_at,
          tags: [{"name": "Testing"}, {"name": "NotionAPI"}]
        }
      } 
      addPage(page);
    });
})
.catch((err) => {
    console.error(err);
});
