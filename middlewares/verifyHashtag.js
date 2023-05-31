export default function verifyHashtag(post_comment){
    const regex = /#[\w-]+/g
    const hashtags = post_comment.match(regex)
    if (hashtags) return hashtags  
    return []
}