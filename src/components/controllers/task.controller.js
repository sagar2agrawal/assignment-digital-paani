import { logger } from '../helpers/index.helper.js';
import * as taskServices from "../services/task.services.js";

const getAllTask = async (req, res, next) => {
    // no parameter all tasks
    // parameters with status and priority
    
    logger.logger.info("Some Error Here Bro");
    res.json({success: "test get"});
}

const addTask = async (req, res, next) => {
    logger.logger.debug(`Add Task API Called with request data ${JSON.stringify(req.body)}`);
    try {
        const dueDate = new Date(req.body.dueDate*1000);

        let result = await taskServices.createTask({
            name: req.body.taskName, 
            description: req.body.taskDescription,
            assignedto: req.body.assignedTo,
            dueDate: dueDate
        }); 
        res.json(result);
    } catch (err) { 
        next(err) 
    } 
}

const deleteTask = async (req, res, next) => {
    res.json({success: "test delete"});
}

const completeTask = async (req, res, next) => {
    res.json({success: "test patch"});
}


export {
    getAllTask,
    addTask,
    deleteTask,
    completeTask
}