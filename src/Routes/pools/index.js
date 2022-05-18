import {Router} from "express";

import {createPool , getPools} from "../../Controllers/poolControllers.js";
import poolValidate from  '../../Middlewares/poolCreateValidation.js'

const poolRouter = Router()

poolRouter.post('/' , poolValidate, createPool )
poolRouter.get('/' , getPools)

// poolRouter.post('/', //função de criar as enquetes
// )

export default poolRouter;