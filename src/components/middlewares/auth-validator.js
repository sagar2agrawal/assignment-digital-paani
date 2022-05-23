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
            userId: "628af79f7ce543245f0ee813",
            userRole: "facilityUser",
            userFacility: "facebook"
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