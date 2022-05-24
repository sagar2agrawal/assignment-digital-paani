import taskModel from "../models/task.models.js";
import userModel from "../models/users.models.js";
import { logger, taskHelper } from '../helpers/index.helper.js';

const createTask = async (task) => {
    const createdTask = await taskModel.create(task);
    if (createdTask) {
        return createdTask;
    }
    throw new Error("Task creation failed with unexpected error");
}

const getTasksById = async (taskId) => {
    const taskDetails = await taskModel.findById({ _id: taskId}).exec();
    
    if (!taskDetails) {
        throw new Error("No such task found");
    } 
    
    return taskDetails;
}

const updateTasksById = async (taskId, updateParamters) => {
    const taskDetails = await taskModel.findOneAndUpdate({ _id: taskId}, updateParamters, {
        new: true
    }).exec(); 
    return taskDetails;
}

const deleteTasksById = async (taskId) => {
    const taskDetails = await taskModel.deleteOne({ _id: taskId}).exec(); 
    return taskDetails;
}

const getAllTask = async (filters) => {
    const allTask = await taskModel.find(filters).lean().exec(); 
    return allTask;
}

const userWithLessLoadInFacility = async (facilityID) => {
    let pipelineQuery = [
        {
            $match: { "facility" : facilityID}
        },
        { 
            $lookup: { 
                from: "tasks",
                localField: "_id",
                foreignField: "assignedTo",
                as: "Remaining_tasks"
            }
        },
        {
            $project: {
                name: 1,
                facility: 1,
                Remaining_tasks: {
                    $filter: {
                        input: "$Remaining_tasks",
                        as: "task_status", //
                        cond: {
                            $in: ["$$task_status.status", ["todo"]]
                        }
                    }
                }
            }
        },
        {
            $project: {
                    name: 1,
                    totalRemainingTask: { $size: "$Remaining_tasks" } 
            }
        },
        { //
            $sort: {
                totalRemainingTask: 1
            }
        },
        { //
            $limit : 1 
        }
    ];

    const usersWihtLessLoadArray = await userModel.aggregate(pipelineQuery);
    return usersWihtLessLoadArray;   
}


const getOverDueTasks = async () => { 
    const allOverDueTask = await taskModel.find({
        status: {
            $ne: "done"
        },
        dueDate: {
            $lt: new Date()
        }
    },
    {
        facility: 1
    }).lean().exec();
    return allOverDueTask;
}

const taskReAssignOnOverDue = async () => {
    try {
        logger.logger.debug("Task reassingment triggered");
        const allTasks = await getOverDueTasks(); 
        const updatedTasks = [];
        // ideally instead of processing here, it will be added to another queue to processed in background
        for (const task of allTasks) {
            const employeeWithLessLoad = await userWithLessLoadInFacility(task.facility);

            if (employeeWithLessLoad.length === 0) {
                throw new Error("Employee for such facility or such facility found");   
            }

            const currentDate = new Date();

            const updatedTaskDetails = await updateTasksById(task._id, {
                dueDate: new Date(currentDate.getTime() + 30000), 
                assignedTo: employeeWithLessLoad[0]._id
            });

            updatedTasks.push(updatedTaskDetails._id);

            logger.logger.debug({
                context: 'Reassingment Overdue Task Jobs',
                taskId: updatedTaskDetails._id
            });
        };

        return updatedTasks;
    } catch (error) {
        logger.logger.error(error);
    }
}




export {
    createTask,
    userWithLessLoadInFacility,
    getTasksById,
    getAllTask,
    updateTasksById, 
    deleteTasksById,
    getOverDueTasks,
    taskReAssignOnOverDue
}