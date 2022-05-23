import { logger } from "../helpers/logger.js";
const authValidator = (req, res, next) => {
    /// check for auth
    // check for role
    // check for role belongs to authorized role
    // check with Redis for blackist
    // throw errors whenenver anything above is failed
    // will user id and role in the req.user with userId userRole
    
    // getting data from header instead of jwt
    const dataFromJWT = JSON.parse(req.headers['user']);
    try {
        req.user = {
            userId: dataFromJWT.userId,
            userRole: dataFromJWT.userRole,
            userFacility: dataFromJWT.userFacility
        }
        next();
    } catch (error) {
        next(error);
    }
    
}

const leadRoleValidator = (req, res, next) => {
    try {
        if (req.user.userRole !== "facilityLead") {
            throw new Error("User not have permission for the task");
        }

        next();
    } catch (error) {
        next(error);
    }
    
    
}



export {
    authValidator,
    leadRoleValidator
}