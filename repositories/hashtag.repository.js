import { db } from "../database/database.connection.js"
import fetch from "node-fetch";
import getMetaData from "metadata-scraper";
global.fetch = fetch

export async function getHashtagsDB() {
    return db.query(`
    SELECT  hashtag_tag, COUNT(hashtag_tag) AS total_hashtag
    FROM hashtag
    GROUP BY hashtag_tag
    ORDER BY total_hashtag DESC;`)

}

export async function postHashtagsDB(hashtags, post_id) {
    try {
        const insertions = hashtags.map(hashtag => {
            return db.query('INSERT INTO hashtag(hashtag_tag, post_id) VALUES ($1, $2) RETURNING hashtag_tag', [hashtag, post_id]);
        });

        const results = await Promise.all(insertions);
        const insertedHashtags = results.map(result => result.rows[0]);

        console.log(insertedHashtags, post_id);
    } catch (err) {
        console.error(err);
    }
}

export async function getHashtagsByNameDB(hashtag) {
    const result = await db.query(`
    SELECT posts.*, users.username, users.user_photo
    FROM posts 
    JOIN users ON posts.user_id = users.user_id 
    JOIN hashtag ON hashtag.post_id = posts.post_id
    WHERE hashtag.hashtag_tag = $1
    ORDER BY created_at 
    DESC LIMIT 20;`, [`#${hashtag}`])

    for (let i = 0; i < result.rows.length; i++) {

        await getMetaData(result.rows[i].post_link)
            .then((metadata) => {
                result.rows[i].image = metadata.image
                result.rows[i].description = metadata.description
                result.rows[i].url = metadata.url
                result.rows[i].title = metadata.title
            },
                (err) => {
                    console.log(err)
                })
    }

    return result
}
