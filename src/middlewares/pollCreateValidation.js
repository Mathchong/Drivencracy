import { pollCreateSchema } from "../schemas/pollCreateSchema.js"

export default function pollValidate(req, res, next) {
    const poll = req.body
    const validation = pollCreateSchema.validate(poll)

    if (validation.error) {
        return res.status(422).json({ message: "Unprocessable Entity", error: validation.error, status: 422 })
    }

    next()

}