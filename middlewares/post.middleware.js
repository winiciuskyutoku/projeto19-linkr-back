import { db } from "../database/database.connection.js"

export async function validateDeletePost(req, res, next){
    const {user_id} = req.params
    const userId = res.locals.session.user_id

    if(Number(user_id )!== userId) return res.status(401).send({message: "Voce nao pode excluir esse post"})
    
    next()
}