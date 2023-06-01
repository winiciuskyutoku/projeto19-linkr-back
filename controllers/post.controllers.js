import verifyHashtag from "../middlewares/verifyHashtag.js"
import { postHashtags, postPostsDB } from "../repositories/post.repositories.js"


export async function postPosts(req, res) {
    const { user_id } = res.locals.session
    const { post_link, post_comment } = req.body
    try {
        const { rows: [post_id] } = await postPostsDB(user_id, post_link, post_comment)
        const hashtags = verifyHashtag(post_comment)


        if (hashtags.length > 0) {
            hashtags.forEach(async (hashtag) => {
                await postHashtags(hashtag, post_id.id)
            })
        }

        console.log(user_id, post_link, post_comment, post_id, hashtags)
        res.sendStatus(201)
    } catch (err) {
        res.status(500).send(err.message)
    }
}