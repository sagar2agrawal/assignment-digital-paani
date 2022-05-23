import { logger } from "../helpers/logger.js";

const csvFormatToObject = (req, res, next) => {
    try {

        const input = req.body.split(',');
        req.body = {};
        req.body.name = input[0];
        req.body.description = input[1];
        req.body.assignedTo = input[2];
        req.body.dueDate = input[3];
        req.body.priority = input[4];
        req.body.facility = input[5];

        if (input[5] === undefined) {
            throw new Error("Partial input might be missing");
        }

        next(); 
    } catch (err) {
        next(err);
    }
    
}

export {
    csvFormatToObject
}