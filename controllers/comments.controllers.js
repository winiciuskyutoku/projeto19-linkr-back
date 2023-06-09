import { getCommentsRepository, postCommentsRepository } from "../repositories/comments.repository.js"

export async function getComments(req, res){
    const {post_id} = req.params
    const id = Number(post_id)
    try {
        const result = await getCommentsRepository(id)

        res.send(result)
    } catch (err){
        res.status(500).send(err.message)
    }
}

export async function postComments(req, res){
    const {user_id, post_id, comment_text} = req.body
    try{
        await postCommentsRepository(comment_text, user_id, post_id)

        res.sendStatus(201)
    } catch (err){
        res.status(500).send(err.message)
    }

}