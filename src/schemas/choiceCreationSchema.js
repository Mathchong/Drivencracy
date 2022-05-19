import Joi from "joi";

export const choiceCreationSchema = Joi.object({
    title: Joi.string().min(5).required(),
    pollId: Joi.string().required()
})