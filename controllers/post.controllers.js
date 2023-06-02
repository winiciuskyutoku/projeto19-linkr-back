import verifyHashtag from "../middlewares/verifyHashtag.js"
import { getPostRepository, getHashtagsDB, postHashtagsDB, postPostsDB } from "../repositories/post.repositories.js"
import urlMetadata from "url-metadata"
import getMetaData from "metadata-scraper"


export async function postPosts(req, res) {
    const { user_id } = res.locals.session
    const { post_link, post_comment } = req.body
    try {
        const { rows: [post_id] } = await postPostsDB(user_id, post_link, post_comment)
        const hashtags = verifyHashtag(post_comment)


        if (hashtags.length > 0) {
            hashtags.forEach(async (hashtag) => {
                await postHashtagsDB(hashtag, post_id.id)
            })
        }

        console.log(user_id, post_link, post_comment, post_id, hashtags)
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


export async function getHashtags(req, res) {
    try {
        const result = await getHashtagsDB()

        res.status(200).send(result.rows)
    } catch (err) {
        res.status(500).send(err.message)
    }
}