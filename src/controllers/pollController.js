import connectMongoDB from "../app/mongoDatabase.js"
import dayjs from 'dayjs'
import { ObjectId } from "mongodb"

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

            const allChoices = await db.collection('choices').find({ pollId: new ObjectId(pollId) }).toArray()
            console.log(allChoices)

            const choicesIds = allChoices.map((choice) => choice._id)

            const votes = await db.collection('votes').find({ choiceId: { $in: choicesIds } }).toArray()
            let frequency = {}
            let max = 0
            let result

            for(let vote in votes) {
                frequency[votes[vote].choiceId] = (frequency[votes[vote].choiceId] || 0) + 1
                console.log(`TESTE ${frequency[votes[vote].choiceId]}, ${vote}`)
                if (frequency[votes[vote].choiceId] > max) {
                    max = frequency[votes[vote].choiceId]
                    result = votes[vote].choiceId
                }
            }
            console.log(result)

            const poll = await db.collection('polls').findOne({_id: new ObjectId(pollId)})
            const choice = await db.collection('choices').findOne({_id: result})
            console.log(choice)

            const mostVotedChoice = {
                _id: pollId,
                title: poll.title,
                expireAt: poll.expireAt,
                result:{
                    title: choice.title,
                    votes: max
                }
            }

            res.json({ message: "Votes Found", winner: mostVotedChoice, status: 200 })

        } catch (error) {
            res.status(400).json({ error })
        }
    }
}