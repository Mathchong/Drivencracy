import { ObjectId } from 'mongodb';
import connectMongoDB from '../app/mongoDatabase.js'
import dayjs from 'dayjs'

export default class ChoiceController {
    async createChoiceOption(req, res) {
        try {
            console.log('Arived from next')

            const { db } = await connectMongoDB()
            const { body } = req;
            console.log(body)
            const id = body.pollId
            console.log(id)

            const poll = await db.collection("polls").findOne({ _id: new ObjectId(id) })

            console.log(`poll: ${poll}`)

            if (!poll) {
                return res.status(404).json({ message: "poll not found", status: 404 })
            }

            console.log(`is Expired? ${dayjs().isAfter(dayjs(poll.expireAt))}, ${poll.expireAt}`)
            if (dayjs().isAfter(dayjs(poll.expireAt))) {
                return res.status(403).json({ message: "poll expired", status: 403 })
            }


            const choices = await db.collection("choices").find({ pollId: id }).toArray()
            console.log(`Choices ${choices}`)

            
            for(let i = 0; i < choices.length; i++) {
                console.log(`Choice.title ${choices[i].title} body.title ${body.title}`)
                if (choices[i].title === body.title) {
                    console.log('entrei')
                    res.status(409).json({ message: "Choice title already exists", status: 409 })
                    return
                }
            }
            // choices.map((choice) => {
                // console.log(`Choice.title ${choice.title} body.title ${body.title}`)
                // if (choice.title === body.title) {
                //     console.log('entrei')
                //     res.status(409).json({ message: "Choice title already exists", status: 409 })
                //     return
                // }
            // })

            await db.collection('choices').insertOne({ title: body.title, pollId: body.pollId })

            return res.status(201).json({ message: "Choice added successfully", status: 201, body })
        } catch (e) {
            return res.status(400).json({ message: "Error during choice creation", error: e, status: 400 })
        }
    }
}