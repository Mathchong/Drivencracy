import Joi from 'joi';

export const pollCreateSchema = Joi.object({
    title: Joi.string().min(5).required(),
    expireAt: Joi.date().iso()
});
