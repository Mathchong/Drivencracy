import connectMongoDB from "../app/mongoDatabase.js"
import dayjs from 'dayjs'

export default class PollController {

    async createpoll(req, res) {
        try {
            const { db } = await connectMongoDB()

            let poll = req.body
            if (!poll.expireAt) {
                const todayPlus30Days = dayjs().add(30, 'day').format('YYYY-MM-DD HH:mm')
                poll = { ...poll, expireAt: todayPlus30Days }
            }

            await db.collection('polls').insertOne(poll)

            return res.status(201).json({ message: "Created", status: 201 })
        } catch (e) {
            return res.status(400).json({ message: "Error creating poll", status: 400 })
        }

    }

    async getpolls(req, res) {
        try {
            const { db } = await connectMongoDB()
            const polls = await db.collection('polls').find({}).toArray()

            return res.status(200).json({ message: "list of polls found", polls, status: 200 })

        } catch (e) {
            return res.status(404).json({ message: "Error getting polls", status: 404 })
        }
    }

    async getPollChoice(req, res) {
        try {
            const { id } = req.params
            const { db } = await connectMongoDB()

            const choices = await db.collection('choices').find({}).toArray()

            console.log(choices)
            if (!choices) return res.status(404).json({ message: "Poll not found" })
            console.log(choices)

            return res.status(200).json({ message: "Loaded Choices", choices: choices, status: 200 })
        } catch (e) {
            res.status(400).json({ message: "Error getting Choices of poll", status: 404, error: e })
        }
    }

    async mostVotedChoice(req, res) {
        try {
            const { db } = await connectMongoDB()
            const pollId = req.params.id
            console.log(pollId)

            const allChoices = await db.collection('choices').find({pollId: new ObjectId(pollId) }).toArray()
            console.log(allChoices)
            return res.status(200).json({ message: allChoices })

        } catch (error) {
            res.status(400).json({ error, allChoices })
        }
    }
}