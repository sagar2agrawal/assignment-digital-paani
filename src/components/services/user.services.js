import userModel from "../models/users.models.js";

const getUserById = async (userId) => { 
    const userDetails = await userModel.findById({ _id: userId }).lean().exec();
    return userDetails;
}


export {
    getUserById
}