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
    
}

export {
    createTask
}