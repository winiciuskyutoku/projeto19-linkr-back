import bcrypt from "bcrypt"
import {db} from '../database/database.connection.js'

export async function signUpRepository(body){
    const {name, email, password, image} = body

    const hash = bcrypt.hashSync(password, 10)
    return await db.query(`INSERT INTO users (username, user_password, user_photo, user_email) VALUES ($1, $2, $3, $4);`, [name, hash, image, email])
}

export async function singInRepository(body) {
    const {email, password} = body

    return await db.query(`
                        SELECCT user_id, username, user_photo  
                        FROM users 
                        WHERE user_email=$1 AND user_password = $2`,
                        [email, password])

}