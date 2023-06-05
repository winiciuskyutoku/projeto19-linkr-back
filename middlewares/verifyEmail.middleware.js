import { db } from "../database/database.connection.js";



export async function getUserByEmail(email) {
  try {
    result = await db.query(`SELECT user_email FROM users $1 `, [email]);
    return result;
  } catch (error) {
    return error.message;
  }
}
