import {Router} from 'express'

const poolRouter = Router()

poolRouter.get('/pool', (req, res) => {
    return res.send("Get Pool")
})

export default poolRouter;