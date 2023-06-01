import { db } from "../database/database.connection.js";

export async function postPostsDB(user_id, post_link, post_comment) {
    return await db.query(`INSERT INTO posts (user_id, post_link, post_comment)
                    VALUES ($1, $2, $3) RETIRNING post_id`, [user_id, post_link, post_comment])
}

export async function postHashtags(hashtag, post_id){
    await db.query(`INSERT INTO hashtags(hashtag_tag, post_id)
                    VALUES ($1, $2)`, [hashtag, post_id])
}