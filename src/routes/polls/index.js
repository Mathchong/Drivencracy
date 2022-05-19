import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import PollController from "../../controllers/pollController.js";
import pollValidate from '../../middlewares/pollCreateValidation.js'

const pollRouter = Router();
const pollController = new PollController();

pollRouter.post('/', pollValidate, pollController.createpoll)
pollRouter.get('/', pollController.getpolls)


export default pollRouter;