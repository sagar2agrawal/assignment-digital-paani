import Queue from "bull";
import config from "../../configs/index.js";
import { logger } from "../helpers/index.helper.js";

const taskReassignSchedulerQueue = new Queue('taskReAssign', {
    redis: {
        host: config.JOBS.REDIS_HOSTNAME,
        port: config.JOBS.REDIS_PORT,
        username: config.JOBS.REDIS_USERNAME, //
        password: config.JOBS.REDIS_PASSWORD //
    }
});

taskReassignSchedulerQueue.process((job, done) => {
    logger.logger.info(job.id);
    done();
});

const taskReAssignCreateQueue = async (taskDetails) => {
    await taskReassignSchedulerQueue.add({same: "hey"});
}




// Notify user about the reassignment
taskReassignSchedulerQueue.on('completed', () => { 

});

export {
    taskReAssignCreateQueue
}