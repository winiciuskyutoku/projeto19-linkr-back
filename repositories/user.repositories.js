import bcrypt from "bcrypt"

export async function signUpRepository(body){
    const {name, email, password, image} = body

    const hash = bcrypt.hashSync(password, 10)
    return await db.query(`INSERT INTO users (username, user_password, user_photo, user_email) VALUES ($1, $2, $3, $4);`, [name, hash, image, email])
}