import { logger } from '../helpers/index.helper.js';

const getAllTask = async (req, res, next) => { 
    logger.logger.info("Some Error Here Bro");
    res.json({success: "test get"});
}

const addTask = async (req, res, next) => {
    try { 
    } catch (err) { 
        next(err) 
    } 
    res.json({success: "test post"});
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