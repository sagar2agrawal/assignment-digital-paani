import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    facility: String,
    facilityRole: {
        type: String,
        enum: ["facilityUser", "facilityLead"],
        default: "facilityUser"
    } 
},
{ timestamps: true }
);

const userModel = mongoose.model('Users', userSchema);

export default userModel;