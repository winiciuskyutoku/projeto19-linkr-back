
import  jwt  from 'jsonwebtoken'
import {db} from '../database/database.connection.js'

const fetchActiveUser = async (id) => {
    try {
        const result = await db.query(`SELECT * FROM users WHERE user_id= $1`, [id])
        return result
    } catch (error) {
        return error.message
    }

}

const generateWebToken = (id) => jwt.sign({id: id}, process.env.SECRET_JWT, {expiresIn: 86000})

export default { fetchActiveUser, generateWebToken };