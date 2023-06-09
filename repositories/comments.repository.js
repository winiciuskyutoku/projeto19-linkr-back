import { db } from "../database/database.connection.js";

export async function getCommentsRepository(post_id){
    const result = await db.query(`SELECT comment.comment_text, users.username, users.user_photo, users.user_id FROM comment JOIN users ON comment.user_id = users.user_id WHERE post_id = $1;`, [post_id])
    console.log(result.rows)

    return result.rows
}

export async function postCommentsRepository(comment_text, user_id, post_id){
    return await db.query(`INSERT INTO comment (comment_text, user_id, post_id) VALUES ($1, $2, $3);`, [comment_text, user_id, post_id])
}