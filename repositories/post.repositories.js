import { db } from "../database/database.connection.js";
import fetch from "node-fetch";
import getMetaData from "metadata-scraper";
global.fetch = fetch

export async function postPostsDB(user_id, post_link, post_comment) {
    return await db.query(`INSERT INTO posts (user_id, post_link, post_comment)
                    VALUES ($1, $2, $3) RETURNING post_id`, [user_id, post_link, post_comment])
}

export async function getNewPostsAmountDB(date, user_id) {
    return await db.query(`
    SELECT post_id 
    FROM posts
    JOIN follow ON follow.followed_id = posts.user_id
    WHERE follow.follower_id = $2
    AND posts.created_at > $1`, [date, user_id])
}


export async function getPostRepository(page) {
    const result = await db.query(`
    SELECT posts.*, users.username, users.user_photo  
    FROM posts 
    JOIN users ON posts.user_id = users.user_id 
    ORDER BY created_at DESC 
    OFFSET $1
    LIMIT 10;`, [page])

    for (let i = 0; i < result.rows.length; i++) {

        await getMetaData(result.rows[i].post_link)
            .then((metadata) => {
                result.rows[i].image = metadata.image
                result.rows[i].description = metadata.description
                result.rows[i].url = metadata.url
                result.rows[i].title = metadata.title
            },
                (err) => {
                    console.log('inicio', err)
                })
    }

    return result.rows
}

export async function getPostRepositoryLogin(page, user_id) {
    const result = await db.query(`
        SELECT p.*, u.username, u.user_photo, COALESCE(f_count.following, 0) AS following
    FROM users u
    JOIN follow f ON f.followed_id = u.user_id
    LEFT JOIN (
        SELECT follow.follower_id, COUNT(follow.follower_id) AS following
        FROM follow
        GROUP BY follow.follower_id
    ) f_count ON u.user_id = f_count.follower_id
    LEFT JOIN posts p ON p.user_id = f.followed_id
    WHERE f.follower_id = $2
    ORDER BY p.created_at DESC
    OFFSET $1
    LIMIT 10;`, [page, user_id])

    for (let i = 0; i < result.rows.length; i++) {

        await getMetaData(result.rows[i].post_link)
            .then((metadata) => {
                result.rows[i].image = metadata.image
                result.rows[i].description = metadata.description
                result.rows[i].url = metadata.url
                result.rows[i].title = metadata.title
            },
                (err) => {
                    console.log('inicio', err)
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

export async function deletePostRepository(id) {

    return await db.query(`DELETE FROM posts WHERE post_id = $1;`, [id])
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


