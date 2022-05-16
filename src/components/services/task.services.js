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

const userWithLessLoad = async () => {
    let pipelineQuery = [
        {
            $match: { "facility" : "google"}
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
                    status: 1, 
                    priority: 1,
                    assignedto: 1, 
                    dueDate: 1
                }
            }
        }
    ];

    const usersWihtLessLoadArray = await userModel.aggregate(pipelineQuery);
    return usersWihtLessLoadArray;   
}

export {
    createTask,
    userWithLessLoad
}