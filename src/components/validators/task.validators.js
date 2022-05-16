import Joi from "joi";

const addTaskSchema = Joi.object({
    taskName: Joi.string()
                .min(5)
                .max(20)
                .required(),
    taskDescription: Joi.string()
    .min(5)
    .max(2000)
    .required(),
    assignedTo: Joi.string().required(),
    dueDate: Joi.date().timestamp(),
    priority: Joi.string(),
    facility: Joi.string()
}).options({
    abortEarly: false
});


const deleteTaskSchema = Joi.object({
    id: Joi.string()
                .min(5)
                .max(20)
                .required()
});


export {
    addTaskSchema,
    deleteTaskSchema
}