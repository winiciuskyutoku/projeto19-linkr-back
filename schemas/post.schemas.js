import Joi from "joi";

export const postSchema = Joi.object({
    post_link: Joi.string().uri().required(),
    post_comment: Joi.string()
})