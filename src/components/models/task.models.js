import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    name: {
        type: String
    }, //
    description: {
        type: String
    },
    status: {
        type: String,
        enum: ["todo", "done"],
        default: "todo",
        index: true
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "normal",
        index: true
    },
    assignedToName: {
        type: String
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        index: true
    },
    createdByName: {
        type: String
    },
    createdBy: {
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
    { status: 1, dueDate: 1, priority: 1, facility: 1 }, // Index for finding high priority task which are expired
    { status: 1, dueDate: 1, facility: 1 } // Index for finding task which are are expired
);

const taskModel = mongoose.model('Tasks', taskSchema);

export default taskModel;