import { db } from "../database/database.connection.js";

export async function findUserDB(idUser){
    return await db.query(`SELECT * FROM users WHERE user_id = $1;`, [idUser]);
}

export async function followersRatioDB(id, userId) {
    const result = await db.query(`
        SELECT * FROM follow WHERE 
        follower_id = $1 AND followed_id = $2;`, [userId, id]);
    return result;
}

export async function followDB(signal, id, user_id){
    if (!signal) {
        await db.query(`
            INSERT INTO follow (follower_id, followed_id)
            VALUES ($1, $2) RETURNING follow_id;`, [user_id, id]
        );
        return;
    } else {
        await db.query(`
            DELETE FROM follow WHERE follower_id = $1 AND followed_id = $2;`,
            [user_id, id]
        );
        return;
    }
}