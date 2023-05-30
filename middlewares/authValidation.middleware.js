import { db } from "../database/database.connection.js";

export async function authValidation(req, res, next){
    const {authorization} = req.headers
    const token = authorization?.replace("Bearer ", "")
    if(!token) res.sendStatus(401)

    console.log(token)

    try {
        const session = await db.query(`SELECT * FROM sessions WHERE token = $1;`, [token])
        if(session.rowCount === 0) return res.status(401).send("Sem autorizacao")

        res.locals.session = session.rows[0]

        next()
    } catch (err){
        res.status(500).send(err.message)
    }
}