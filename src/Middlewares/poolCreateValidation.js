import { poolCreateSchema } from "../schemas/poolCreateSchema.js"

export default function poolValidate(req, res, next) {
    const pool = req.body

    const validation = poolCreateSchema.validate(pool)
    if (validation.error) {
        return res.status(422).json({ message: "Unprocessable Entity", error: validation.error, status: 422 })
    }

    next()

}