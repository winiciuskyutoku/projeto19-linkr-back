import bcrypt from "bcrypt"
import { db } from '../database/database.connection.js'
import getMetaData from "metadata-scraper"


export async function signUpRepository(body) {
    const { name, email, password, image } = body

    const hash = bcrypt.hashSync(password, 10)
    
    const result = await db.query(
      `INSERT INTO users (username, user_password, user_photo, user_email) 
       VALUES ($1, $2, $3, $4);`,
      [name, hash, image, email]
    );
 
    return result 
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
        console.log(err.message);
        return err.message;
    }
}

export async function getUsersDB(search) {
    return await db.query(`
            SELECT * FROM users WHERE LOWER(username) LIKE LOWER($1)
            || \'%\' OR LOWER(username) LIKE \'% \' || LOWER($1) || \'%\';`, [search]);
}
export async function getUsersOrderDB(users, user){
    return await db.query(`
    SELECT followed_id FROM follow WHERE followed_id IN (${users}) AND follower_id = $1;`, [user]);
}

export async function getUserByIdDB(id) {
    const userProfile = await db.query(`
            SELECT u.username, u.user_photo, p.*
            FROM users u
            LEFT JOIN posts p ON p.user_id = u.user_id
            WHERE u.user_id = $1;`, [id]);
    const likesPosts = await db.query(`
            SELECT l.user_id AS user_liked, p.post_id, u.username AS username_liked, u.user_photo AS user_photo_liked
            FROM likes l
            JOIN posts p ON p.post_id = l.post_id
            JOIN users u ON u.user_id = l.user_id
            WHERE p.user_id = $1;`, [id]);

    for (let i = 0; i < userProfile.rows.length; i++) {
        if(!userProfile.rows[i].post_link){
            break;
        }
        const metadata = await getMetaData(userProfile.rows[i].post_link);

        userProfile.rows[i].image = metadata.image
        userProfile.rows[i].description = metadata.description
        userProfile.rows[i].url = metadata.url
        userProfile.rows[i].title = metadata.title
    }

    return ({ profile: userProfile.rows, likes: likesPosts.rows });
}


export async function getByEmail(email){
           try {
             const result = await db.query(
               `SELECT * FROM users WHERE user_email= $1`,
               [email]
             );
             return result;
           } catch (error) {
             return error.message;
           }
}
