import { ObjectId } from 'mongodb';
import connectMongoDB from '../app/mongoDatabase.js'
import dayjs from 'dayjs'

export default class ChoiceController {
    async createChoiceOption(req, res) {
        try {
            const { db } = await connectMongoDB()
            const { body } = req;
            const id = body.pollId

            const poll = await db.collection("polls").findOne({ _id: new ObjectId(id) })
            if (!poll) return res.status(404).json({ message: "poll not found", status: 404 })

            const expired = dayjs().isAfter(dayjs(poll.expireAt))
            if (expired) return res.status(403).json({ message: "poll expired", status: 403 })

            const choices = await db.collection("choices").find({ pollId: id }).toArray()

            for (let i = 0; i < choices.length; i++) {
                if (choices[i].title === body.title)
                    return res.status(409).json({ message: "Choice title already exists", status: 409 })
            }

            await db.collection('choices').insertOne({ title: body.title, pollId: body.pollId })
            return res.status(201).json({ message: "Choice added successfully", status: 201, body })
        } catch (e) {
            return res.status(400).json({ message: "Error during choice creation", error: e, status: 400 })
        }
    }
}