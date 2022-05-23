import userModel from "../models/users.models.js";

const getUserById = async (userId) => { 
    const userDetails = await userModel.findById({ _id: userId }).lean().exec();

    if (!userDetails) {
        throw new Error("No user with id " + userId);
    }
    return userDetails;
}

const createManyUser = async (users) => { 
    const userDetails = await userModel.insertMany(users);
    return userDetails;
}


export {
    getUserById,
    createManyUser
}