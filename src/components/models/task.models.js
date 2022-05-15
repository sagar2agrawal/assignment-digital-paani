import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    name: String, //
    description: String,
    status: {
        type: String,
        enum: ["todo", "done"],
        default: "todo"
    },
    priority: {
        type: String,
        enum: ["low", "normal", "high"],
        default: "normal"
    },
    assignedto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    dueDate: { 
        type: Date
    }
},
{ timestamps: true }
);

const taskModel = mongoose.model('Tasks', taskSchema);

export default taskModel;