import { logger } from '../helpers/index.helper.js';
import * as taskServices from "../services/task.services.js";
import * as userServices from "../services/user.services.js";
import { taskJobs } from "../jobs/index.jobs.js";

const getAllTask = async (req, res, next) => {
    try {

        // There will be logic to filter and use only the allowed paramters from the filter object
        const filterObject = getAllTaskFilterBuilder({...req.query});

        const allTasks = await taskServices.getAllTask(filterObject);

        res.json(allTasks); 
          
    } catch (err) {
        next(err);
    }
}

const getEmployeeWithLessLoad = async (req, res, next) => {
    try {
        const employeeWithLessLoad = await taskServices.userWithLessLoadInFacility("google");
        
        if (employeeWithLessLoad.length === 0) {
            throw new Error("Employee for such facility or such facility found");   
        }

        res.json(employeeWithLessLoad);   
    } catch (err) {
        next(err);
    }
}

const addTask = async (req, res, next) => {
    logger.logger.debug(`Add Task API Called with request data ${JSON.stringify(req.body)}`);
    try {
        const dueDate = new Date(req.body.dueDate*1000);

        // Getting and validating details of assignee and creating employee as well as permissions
        const {assigneeEmp, creatorEmp} = await getEmpDetailsTaskCreation(req.body, req.user);

        let result = await taskServices.createTask({
            name: req.body.taskName, 
            description: req.body.taskDescription,
            assignedTo: assigneeEmp._id,
            assignedToName: assigneeEmp.name,
            dueDate: dueDate,
            priority: req.body.priority,
            facility: req.body.facility,
            createdBy: creatorEmp.id
        });
        
        /*
             Other events/async/jobs can be added to notify and do other things if needed in background
        */
        res.json(result);
    } catch (err) { 
        next(err) 
    } 
}

const deleteTask = async (req, res, next) => {
    try {
        // task id will be validated from the validator middleware
        const taskDetail = await taskServices.getTasksById(req.params.id);
        // Task deletion is allowed by employee who has created the task 
        // or if the request is from facility lead
        if (
            !(taskDetail.createdBy?.toString() === req.user.userId) &&
            !(taskDetail.facility === req.user.userFacility 
                && req.user.userRole === "facilityLead")
            ) {
                throw new Error('User is not authorized to delete this task');
        } 

        // Actually deleting the task based on the task id
        const taskDeleteStatus = await taskServices.deleteTasksById(req.params.id);

        res.json({success: taskDeleteStatus});
        
    } catch (err) {
        next(err);
    }
}

const updateTask = async (req, res, next) => {
    try {
        // task id will be validated from the validator middleware
        const taskDetail = await taskServices.getTasksById(req.params.id);
        
        // Task updation is allowed by employee who has created the task 
        // or if the request is from facility lead
        if (
            !(taskDetail.createdBy?.toString() === req.user.userId) &&
            !(taskDetail.facility === req.user.userFacility 
                && req.user.userRole === "facilityLead")
            ) {
                throw new Error('User is not authorized to update this task');
        }

        // updating the task base on the task id
        const updateTaskQuery = taskUpdateQueryBuilder(req.body);
        const updatedTaskDetails = await taskServices.updateTasksById(req.params.id, updateTaskQuery);
        res.json({success: updatedTaskDetails});
        
    } catch (error) {
        next(error);
    }
}

const getAllTaskFilterBuilder = (parameters) => { 
    const queryFilterParameter = {};
    
    const allowedFilterParamters = {
        "facility": "facility", //
        "priority": "priority", //
        "status": "status", //
        "assignedTo": "assignedTo"
    }

    Object.keys(parameters).map((item) => { 
        if (allowedFilterParamters[item]) {
            queryFilterParameter[item] = parameters[item];
        }
    });

    return {...queryFilterParameter}
}

const taskUpdateQueryBuilder = (parameters) => { 
    const queryUpdateParameter = {};
    
    const allowedChanges = {
        "name": "name",
        "description": "description",
        "dueDate": "dueDate",
        "assignedToName": "assignedToName",
        "facility": "facility", //
        "priority": "priority", //
        "status": "status", //
        "assignedTo": "assignedTo"
    }

    Object.keys(parameters).map((item) => { 
        if (allowedChanges[item]) {
            queryUpdateParameter[item] = parameters[item];
        }
    });

    return {...queryUpdateParameter}
}

// All the logic to handle the employee assignment and employee creator details
const getEmpDetailsTaskCreation = async (requestData, sessionData) => { 
    let employData;
        /*
            1. Logic to check if the current user has the access to create task in the given facility
        */
        if (requestData.assignedTo) { //
            employData = await userServices.getUserById(requestData.assignedTo);
            if (employData?.facility !== requestData.facility || requestData?.facility !== sessionData.userFacility) {
                throw new Error(`Not allowed to create task for ${employData.name} with in ${requestData?.facility} facility`);
            }

            if (sessionData.userRole !== "facilityLead" && sessionData.userId !== requestData.assignedTo) {
                throw new Error(`Not allowed to create task for another employee`);
            }
        } 
        
        // if a task was created for no specific user
        if (!requestData.assignedTo) { //
            const employeeWithLessLoad = await taskServices.userWithLessLoadInFacility(requestData.facility);

            if (employeeWithLessLoad.length === 0 || sessionData.userFacility !== requestData.facility) {
                throw new Error("Employee for such facility or such facility found");   
            }

            employData = employeeWithLessLoad[0];
        }

        const creatorEmp = {
            id: sessionData.userId
        };

        return {
            assigneeEmp: employData, 
            creatorEmp, 
        }
}

export {
    getAllTask,
    addTask,
    deleteTask,
    updateTask,
    getEmployeeWithLessLoad
}