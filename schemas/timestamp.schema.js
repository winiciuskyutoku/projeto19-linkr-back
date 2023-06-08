import Joi from "joi";

export const timestampSchema = Joi.object({
    last_atualization:Joi.string().pattern(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)
})