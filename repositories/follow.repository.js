import { db } from "../database/database.connection.js";

export async function findUserDB(idUser){
    return await db.query(`SELECT * FROM users WHERE user_id = $1;`, [idUser]);
}

export async function followersRatioDB(id, userId) {
    const result = await db.query(`
        SELECT * FROM follow WHERE 
        "followerId" = $1 AND "followedId" = $2;`, [userId, id]);
    return result;
}

export async function followDB(signal, id, user_id){
    if (signal) {
        await db.query(`
            INSERT INTO follow ("followerId", "followedId")
            VALUES ($1, $2);`, [user_id, id]
        );
        return;
    } else {
        await db.query(`
            DELETE FROM follow WHERE "followerId" = $1 AND "followedId" = $2;`,
            [user_id, id]
        );
        return;
    }
}