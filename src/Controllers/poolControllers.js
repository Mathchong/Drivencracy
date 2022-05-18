import connectMongoDB from "../app/mongoDatabase.js"
import dayjs from 'dayjs'

export async function createPool(req, res) {
    try {
        const { db } = await connectMongoDB()
        
        let pool = req.body
        if(!pool.expireAt){
            const todayPlus30Days = dayjs().add(30,'day').format('YYYY-MM-DD HH:mm').toString()
            pool = {...pool , expireAt: todayPlus30Days}
        }
        
        await db.collection('pools').insertOne(pool)

        return res.status(201).json({ message: "Created", status: 201 })
    } catch (e) {
        return res.status(400).json({ message: "Error creating pool", status: 400 })
    }

}

export async function getPools(req, res) {
    try{
        const {db} = await connectMongoDB()

        const pools = await db.collection('pools').find().toArray()

        res.status(200).json({message: "list of pools found", pools, status: 200})

     } catch (e) {
         res.status(404).json({ message: "Error getting pools", status: 404 })
    }
}