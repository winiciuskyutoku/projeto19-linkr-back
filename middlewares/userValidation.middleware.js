import { db } from "../database/database.connection.js";

export async function signUpValidation(req, res, next){
  
    try {
        const result = await db.query(`SELECT * FROM users WHERE user_email = $1;`, [req.body.email])
        if(result.rowCount > 0) return res.status(409).send({message: "Esse email ja foi cadastrado!"})
        next()
    } catch (err){
        res.status(500).send(err.message)
    }
}