import Router from "express";
import * as taskController from "../controllers/task.controller.js";
import { validateReqBody, validateReqParams } from "../middlewares/request-validator.js";
import { addTaskSchema, deleteTaskSchema } from "../validators/task.validators.js";
import { authValidator } from "../middlewares/auth-validator.js";

const taskRouter = new Router();

taskRouter.get('/tasks', taskController.getAllTask);
taskRouter.post('/tasks', validateReqBody(addTaskSchema), taskController.addTask);
taskRouter.patch('/tasks/:id', taskController.updateTask);
taskRouter.delete('/tasks/:id',authValidator, validateReqParams(deleteTaskSchema), taskController.deleteTask);

export default taskRouter;