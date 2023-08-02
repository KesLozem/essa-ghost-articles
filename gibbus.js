require("dotenv").config();
const { Client } =  require("@notionhq/client")

const notion = new Client({ auth: process.env.NOTION_GIBBUS_KEY })
const databaseId = process.env.NOTION_DB_ID

async function addPage(page) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        title: {
          title:[
            {
              "text": {
                "content": page.properties.title
              }
            }
          ]
        },
        Author: {
          rich_text: [
            {
              "text": {
                "content": page.properties.author,
                "link": null
              }
            }
          ]
        },
        Date: {
           "date": {
            "start": page.properties.date
          }
        },
        Tags: {
          multi_select: page.properties.tags
        }
      },
    })
    console.log(response)
    console.log("Success! Entry added.")
  } catch (error) {
    console.error(error.body)
  }
}

module.exports = addPage;

// page = {
//  properties: {
//    title: "The \"Crate\" Depression",
//    author: "Les Kosem",
//    date: "2023-01-11",
//    tags: [{"name": "Testing"}, {"name": "NotionAPI"}]
//   }
// }
//  
// addPage(page)
