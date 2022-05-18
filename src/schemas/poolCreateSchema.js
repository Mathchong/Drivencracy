import Joi from 'joi';

export const poolCreateSchema = Joi.object({
    title: Joi.string().min(5).required(),
    expireAt: Joi.string().regex(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12]\d|3[01]) ([01]\d|2[0123]):([0-5]\d)$/)
});