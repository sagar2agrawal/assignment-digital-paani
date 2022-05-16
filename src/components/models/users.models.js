import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    facility: String
},
{ timestamps: true }
);

const userModel = mongoose.model('Users', userSchema);

export default userModel;