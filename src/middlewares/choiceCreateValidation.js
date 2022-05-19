import { choiceCreationSchema } from "../schemas/choiceCreationSchema.js";

export default function validateChoiceCreation(req, res, next) {
    const validation = choiceCreationSchema.validate(req.body)

    if (validation.error) {
        return res.status(422).json({ message: "Unprocessable entity: ", error: validation.error, status: 422 })
    }

    next()
}