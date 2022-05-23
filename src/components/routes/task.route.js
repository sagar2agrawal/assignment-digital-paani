import Router from "express";
import * as taskController from "../controllers/task.controller.js";
import { validateReqBody, validateReqParams } from "../middlewares/request-validator.js";
import { addTaskSchema, deleteTaskSchema } from "../validators/task.validators.js";
import { authValidator, leadRoleValidator } from "../middlewares/auth-validator.js";
import { csvFormatToObject } from "../middlewares/task-data-transformer.js";
const taskRouter = new Router();

taskRouter.get('/tasks', authValidator, taskController.getAllTask);

taskRouter.get('/lessLoadEmployee', authValidator, taskController.getEmployeeWithLessLoad);

taskRouter.post('/tasks', authValidator, validateReqBody(addTaskSchema), taskController.addTask);

// task data is convert from csv format to json object and it uses the same controller
taskRouter.post('/tasks/csv', authValidator, csvFormatToObject, taskController.addTask);

taskRouter.patch('/tasks/:id', authValidator, taskController.updateTask);

/* 
    task id will be validated from the validator middlewar
    Not implemented as example implementation is there in createTask
*/
taskRouter.delete('/tasks/:id', authValidator, validateReqParams(deleteTaskSchema), taskController.deleteTask);

export default taskRouter;