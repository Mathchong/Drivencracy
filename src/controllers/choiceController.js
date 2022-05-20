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
            console.log(poll)
            if (!poll) return res.status(404).json({ message: "poll not found", status: 404 })

            const expired = dayjs().isAfter(dayjs(poll.expireAt))
            if (expired) return res.status(403).json({ message: "poll expired", status: 403 })

            const choices = await db.collection("choices").find({ pollId: new ObjectId(id) }).toArray()
            console.log(choices)

            for (let i = 0; i < choices.length; i++) {
                if (choices[i].title === body.title)
                    return res.status(409).json({ message: "Choice title already exists", status: 409 })
            }

            await db.collection('choices').insertOne({ title: body.title, pollId: new ObjectId(body.pollId) })
            return res.status(201).json({ message: "Choice added successfully", status: 201, body })
        } catch (e) {
            return res.status(400).json({ message: "Error during choice creation", error: e, status: 400 })
        }
    }

    async vote(req, res) {
        try {
            const { db } = await connectMongoDB()
            const choiceId = req.params.id
            const now = dayjs().format('YYYY-MM-DD HH:mm')

            const choice = await db.collection('choices').findOne({ _id: new ObjectId(choiceId) })
            if (!choice) return res.status(404).json({ message: "Choice not found", status: 404 })

            const poll = await db.collection('polls').findOne({ _id: new ObjectId(choice.pollId) })

            const expired = dayjs().isAfter(dayjs(poll.expireAt))
            if (expired) return res.status(403).json({ message: "poll expired", status: 403 })

            await db.collection("votes").insertOne({ createdAt: now, choiceId: new ObjectId(choiceId) })
            return res.status(201).json({ message: "Vote created", status: 201 })

        } catch (e) {
            res.status(400).json({ message: "Error during vote", status: 400, error: e });
        }
    }
}