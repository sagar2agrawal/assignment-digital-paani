import taskModel from "../models/task.models.js";
import userModel from "../models/users.models.js";

const createTask = async (task) => {
    const createdTask = await taskModel.create(task);
    if (createdTask) {
        const assignedToUser = await userModel.findById(createdTask.assignedto);
        return {taskDetails: createdTask, nameOfUser: assignedToUser.name}
    }
}

const getTasks = async () => { 
    return
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
                foreignField: "assignedto",
                as: "Remaining_tasks"
            }
        },
        {
            $project: {
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
    userWithLessLoadInFacility
}