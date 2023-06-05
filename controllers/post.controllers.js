import verifyHashtag from "../middlewares/verifyHashtag.js"
import { postHashtagsDB } from "../repositories/hashtag.repository.js"
import { getPostRepository, postPostsDB, likePostDB } from "../repositories/post.repositories.js"



export async function postPosts(req, res) {
    const { user_id } = res.locals.session
    const { post_link, post_comment } = req.body
    try {
        const { rows: [post_id] } = await postPostsDB(user_id, post_link, post_comment)
        const hashtags = verifyHashtag(post_comment)
        console.log(post_id)

        if (hashtags.length > 0) {
            postHashtagsDB(hashtags, post_id.post_id)
        }
        res.sendStatus(201)
    } catch (err) {
        res.status(500).send(err.message)
    }
}


export async function getPosts(req, res) {

    try {
        const result = await getPostRepository()

        res.send(result)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function likePost(req, res) {
    const { id } = req.params;
    const { user_id } = res.locals.session;
    try {
        await likePostDB(id, user_id);
        res.send("Sucesso");
    } catch (error) {
        res.status(500).send(error.message);
    }
}