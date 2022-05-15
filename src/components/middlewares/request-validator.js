import { logger } from "../helpers/logger.js";

const validateReqBody = (schema) => (req, res, next) => {
    const validation = schema.validate(req.body);
    if (validation.error) {
        const errorResponse = { 
            errorMessage: []
        };

        errorResponse.errorMessage = validation.error.details.map((errorItem) => { return errorItem.message });
        res.status(400).json(errorResponse); 
    } else { //
        next();
    }

    
}

const validateReqParams = (schema) => (req, res, next) => {
    const validation = schema.validate(req.params);
    if (validation.error) {
        const errorResponse = { 
            errorMessage: []
        };

        errorResponse.errorMessage = validation.error.details.map((errorItem) => { return errorItem.message });
        res.status(400).json(errorResponse); 
    } else { //
        next();
    }
}

export {
    validateReqBody,
    validateReqParams
}