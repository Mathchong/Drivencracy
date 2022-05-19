import { Router } from "express";
import validateChoiceCreation from "../../middlewares/choiceCreateValidation.js";
import ChoiceController from "../../controllers/choiceController.js";

const choiceRouter = Router()
const choiceController = new ChoiceController()

choiceRouter.post('/', validateChoiceCreation , choiceController.createChoiceOption)

export default choiceRouter;