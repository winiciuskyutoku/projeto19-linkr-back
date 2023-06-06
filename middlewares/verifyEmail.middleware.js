import { db } from "../database/database.connection.js";

export async function signUpValidation(req, res, next) {
  try {
    const result = await db.query(
      `SELECT user_email FROM users $1 `,
      [req.body.email]
    );
    if (result.rowCount > 0)
      return res
        .status(409)
        .send({ message: "Esse email já cadastrado!" });
    next();
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getUserByEmail(email) {
  try {
    result = await db.query(`SELECT user_email FROM users $1 `, [email]);
    return result;
  } catch (error) {
    return error.message;
  }
}
