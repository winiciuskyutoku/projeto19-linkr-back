import bcrypt from "bcrypt"
import { db } from '../database/database.connection.js'

export async function signUpRepository(body) {
    const { name, email, password, image } = body

    const hash = bcrypt.hashSync(password, 10)
    return await db.query(`INSERT INTO users (username, user_password, user_photo, user_email) VALUES ($1, $2, $3, $4);`, [name, hash, image, email])
}

export async function singInRepository(body) {
    const { email, password } = body;
    try {
        const result = await db.query(
            `SELECT user_id, username, user_photo, user_password  
        FROM users 
        WHERE user_email=$1`,
            [email]
        );

        if (result.rowCount > 0) {
            const passwordMatch = bcrypt.compareSync(password, result.rows[0].user_password);

            if (passwordMatch) {
                return result
            }
        }
        return null;
    } catch (err) {
        throw err;
    }
}

export async function getUsersDB(search) {
    return await db.query('SELECT * FROM users WHERE username LIKE $1 || \'%\' OR username LIKE \'% \' || $1 || \'%\';', [search]);
}