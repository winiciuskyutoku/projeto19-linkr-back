import verifyHashtag from "../middlewares/verifyHashtag.js"
import { getPostRepository, postPostsDB, deletePostRepository, likePostDB, getNewPostsAmountDB, getPostRepositoryLogin } from "../repositories/post.repositories.js"
import { postHashtagsDB } from "../repositories/hashtag.repository.js"

export async function postPosts(req, res) {
    const { user_id } = res.locals.session
    const { post_link, post_comment } = req.body
    try {
        const { rows: [post_id] } = await postPostsDB(user_id, post_link, post_comment)
        const hashtags = verifyHashtag(post_comment)

        if (hashtags.length > 0) {
            postHashtagsDB(hashtags, post_id.post_id)
        }
        res.sendStatus(201)
    } catch (err) {
        res.status(500).send(err.message)
    }
}


export async function getPosts(req, res) {
    const {date} = req.params
    try {
        const result = await getPostRepository(date)
        res.send(result)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function getPostsLogin(req, res) {
    const {date} = req.params
    const { user_id } = res.locals.session
    try {
        const result = await getPostRepositoryLogin(date, user_id)
        res.send(result)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function getNewPostsAmount(req, res) {
    const {date} = req.params
    const { user_id } = res.locals.session
    try {
        const {rowCount:result} = await getNewPostsAmountDB(date, user_id)
        console.log(result.toString(), date, user_id)
        res.send(result.toString())
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

export async function deletePost(req, res) {
    const { id } = req.params

    try {
        await deletePostRepository(id)

        res.sendStatus(202)
    } catch (err) {
        res.status(500).send(err.message)
    }
}