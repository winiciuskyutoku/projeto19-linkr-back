import { db } from "../database/database.connection.js";

const insertTokenInDatabase = async (token, user_id) => {
  try {
    const result = db.query(
      `INSERT INTO session(session_token , user_id) VALUES ($1, $2)`,
      [token, user_id]
    );
    return result
  } catch (error) {
    return error.message;
  }
}


const findTokenInDatabase = async(token)=> {
    try {
      const result = db.query (`SELECT user_id, session_id FROM session WHERE session_token = $1`, [token])  
      return result
    } catch (error) {
        return error.message;
    }


}



export default { insertTokenInDatabase, findTokenInDatabase };
