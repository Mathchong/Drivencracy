import express, {json} from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import router from './Routes/index.js'

dotenv.config()
const app = express()
app.use(cors())
app.use(json())
app.use(router)


app.listen(process.env.PORT, ()=>{
    console.log("listening on 'http://localhost:5000' ")
})