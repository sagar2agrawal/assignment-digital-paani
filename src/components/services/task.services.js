import taskModel from "../models/task.models.js";
import userModel from "../models/users.models.js";

const createTask = async (task) => {
    const createdTask = await taskModel.create(task).exec();
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

export {
    createTask,
    userWithLessLoadInFacility,
    getTasksById,
    getAllTask,
    updateTasksById, 
    deleteTasksById
}