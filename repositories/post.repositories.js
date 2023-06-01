import { db } from "../database/database.connection.js";

export async function postPostsDB(user_id, post_link, post_comment) {
    return await db.query(`INSERT INTO posts (user_id, post_link, post_comment)
                    VALUES ($1, $2, $3) RETIRNING post_id`, [user_id, post_link, post_comment])
}

export async function postHashtagsDB(hashtag, post_id){
    await db.query(`INSERT INTO hashtags(hashtag_tag, post_id)
                    VALUES ($1, $2)`, [hashtag, post_id])
}


export async function getPostRepository(){
    const result = await db.query(`SELECT * FROM posts ORDER BY created_at DESC LIMIT 20;`)

    return result.rows
}

export async function getHashtagsDB(){
    return db.query(`SELECT hashtags.hashtag_id, hashtags.hashtag_tag, COUNT(hastags.hashtag_tag) AS total_hashtag
                    FROM hashtags
                    ORDER BY total_hashtag DESC;`)
}