import { logger } from "../helpers/logger.js";
const authValidator = (req, res, next) => {
    /// check for auth
    // check for role
    // check for role belongs to authorized role
    // check with Redis for blackist
    // throw errors whenenver anything above is failed
    // will user id and role in the req.user with userId userRole

    try {
        req.user = {
            userId: "6280f57a8524341f061ca44f",
            userRole: "facilityLead",
            userFacility: "google"
        }
        next();
    } catch (error) {
        next(error);
    }
    
}

const leadRoleValidator = (req, res, next) => {
    try {
        if (req.user.userRole === "facilityLead") {
            next();
        }

        throw new Error("User not have permission for the task")
    } catch (error) {
        next(error);
    }
    
    
}



export {
    authValidator,
    leadRoleValidator
}