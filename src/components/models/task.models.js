import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    name: String, //
    description: String,
    status: {
        type: String,
        enum: ["todo", "done"],
        default: "todo",
        index: true
    },
    priority: {
        type: String,
        enum: ["low", "normal", "high"],
        default: "normal",
        index: true
    },
    assignedto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        index: true
    },
    facility: { 
        type: String,
        index: true
    },
    dueDate: { 
        type: Date,
        index: true
    }
},
{ timestamps: true }
);

taskSchema.index(
    { status: 1, dueDate: 1, priority: 1, assignedto: 1, facility: 1 },
    { status: 1, dueDate: 1, facility: 1 }, // Index for finding high priority task which are expired
    { dueDate: 1, facility: 1} // Index for finding task which are are expired
);

const taskModel = mongoose.model('Tasks', taskSchema);

export default taskModel;