import joi from "joi"

export const commentSchema = joi.object({
    comment_text: joi.string().min(10).required(),
    user_id: joi.number().integer(),
    post_id: joi.number().integer()
})