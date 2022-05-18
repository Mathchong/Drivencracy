import connectMongoDB from "../app/mongoDatabase.js"
import dayjs from 'dayjs'

export default async function createPool(req, res) {
    try {
        const { db } = await connectMongoDB()
        
        let pool = req.body
        if(!pool.expireAt){
            console.log("CHEGUEI 1")
            const todayPlus30Days = dayjs().add(30,'day').format('YYYY-MM-DD HH:mm').toString()
            console.log("CHEGUEI 1")
            pool = {...pool , expireAt: todayPlus30Days}
            console.log("CHEGUEI 1")
        }
        
        await db.collection('pools').insertOne(pool)

        return res.status(201).json({ message: "Created", status: 201 })
    } catch (e) {
        return res.status(400).json({ message: "Error creating pool", status: 400 })
    }

}

