import { logger } from '../helpers/index.helper.js';
import * as taskServices from "../services/task.services.js";
import * as userServices from "../services/user.services.js";
import { taskJobs } from "../jobs/index.jobs.js";


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
    taskUpdateQueryBuilder, 
    getAllTaskFilterBuilder,
    getEmpDetailsTaskCreation
}