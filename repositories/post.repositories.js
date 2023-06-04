import { db } from "../database/database.connection.js";
import urlMetadata from "url-metadata";
import fetch from "node-fetch";
import getMetaData from "metadata-scraper";
global.fetch = fetch

export async function postPostsDB(user_id, post_link, post_comment) {
    return await db.query(`INSERT INTO posts (user_id, post_link, post_comment)
                    VALUES ($1, $2, $3) RETURNING post_id`, [user_id, post_link, post_comment])
}

export async function postHashtagsDB(hashtag, post_id) {
    await db.query(`INSERT INTO hashtags(hashtag_tag, post_id)
                    VALUES ($1, $2)`, [hashtag, post_id])
}


export async function getPostRepository() {
    const result = await db.query(`SELECT posts.*, users.username, users.user_photo  FROM posts JOIN users ON posts.user_id = users.user_id ORDER BY created_at DESC LIMIT 20;`)

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

    return result.rows
}

export async function getHashtagsDB() {
    return db.query(`
    SELECT hashtag_id, hashtag_tag, COUNT(hashtag_tag) AS total_hashtag
    FROM hashtag
    GROUP BY hashtag_id, hashtag_tag
    ORDER BY total_hashtag DESC;`)

}

export async function likePostDB(post_id, user_id) {
    const result = await db.query(`
        SELECT * FROM likes WHERE post_id = $1 AND user_id = $2;`,
        [post_id, user_id]);

    if (result.rowCount) {
        await db.query(`
            DELETE FROM likes WHERE post_id = $1 AND user_id = $2;`,
            [post_id, user_id]);
        return;
    } else {
        await db.query(`
            INSERT INTO likes (post_id, user_id) VALUES ($1, $2);`,
            [post_id, user_id]);
        return;
    }
}