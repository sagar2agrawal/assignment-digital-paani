import { logger } from "../helpers/logger.js";
const authValidator = (req, res, next) => { 
    logger.info(req.cookies);
    // Skipping the implementation
    next();
}


export {
    authValidator
}