require("dotenv").config();
const GhostContentAPI = require('@tryghost/content-api');

const api = new GhostContentAPI({
    url: 'https://dev.economicstudents.com',
    key: process.env.CONTENT_KEY,
    version: "v5.0"
});

api.posts.browse({limit: 10000})
.then((posts) => {
    posts.forEach((post) => {
        let json = {"title": post.title, "url": post.url, "date": post.created_at}
        console.log(JSON.stringify(json))
    });
})
.catch((err) => {
    console.error(err);
});

// Run below in bash to output to csv:
// node src.js | jq -s . > output.json
// cat output.json | jq -r '(map(keys) | add | unique) as $cols | map(. as $row | $cols | map($row[.])) as $rows | $cols, $rows[] | @csv' > output.csv