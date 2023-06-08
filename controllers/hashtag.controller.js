import { getHashtagsByNameDB, getHashtagsDB } from "../repositories/hashtag.repository.js"


export async function getHashtags(req, res) {
    try {
        const result = await getHashtagsDB()

        res.status(200).send(result.rows)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function getHashtagsByName(req, res) {
    const hashtag = req.params.hashtag
    try {
        const result = await getHashtagsByNameDB(hashtag)
        
        res.status(200).send(result.rows)
    } catch (err) {
        res.status(500).send(err.message)
    }
}