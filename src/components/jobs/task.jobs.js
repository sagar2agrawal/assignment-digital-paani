import Queue from "bull";
import config from "../../configs/index.js";
import { logger } from "../helpers/index.helper.js";
import { taskReAssignOnOverDue } from "../services/task.services.js";

const redisConnector = {
    host: config.JOBS.REDIS_HOSTNAME,
    port: config.JOBS.REDIS_PORT,
    username: config.JOBS.REDIS_USERNAME, //
    password: config.JOBS.REDIS_PASSWORD //
};

const taskReassignSchedulerQueue = new Queue('taskReAssign', {
    redis: redisConnector
});

taskReassignSchedulerQueue.process(async (job, done) => {
    /*
        To scale this, we would actually populate another queue
        with inividual tasks reassignment
        instead of 
        bulk processing in the current queue 
    */

    const result = await taskReAssignOnOverDue();
    done(null, result);
});

const taskReAssignCreateQueue = async (taskDetails) => {
    await taskReassignSchedulerQueue.add({description: "CRON Job for filling reassignment tasks"}, {
        removeOnComplete: true,
        repeat: {
            every: 60000
        },
        limiter: {
            max: 1,
            duration: 60000
        }
    });
}


// Notify user about the reassignment
taskReassignSchedulerQueue.on('completed', (job, result) => {
    logger.logger.debug({
        context: `task reassignment complete with these tasks for job ${job.id}`,
        listOfTasks: result
    }); 
});

const taskReAssignEmptyAllQueue = async (taskDetails) => {
    taskReassignSchedulerQueue.clean(0, 'delayed');
    taskReassignSchedulerQueue.clean(0, 'wait');
    taskReassignSchedulerQueue.clean(0, 'active');
    taskReassignSchedulerQueue.clean(0, 'completed');
    taskReassignSchedulerQueue.clean(0, 'failed');
}


export {
    taskReAssignCreateQueue,
    taskReAssignEmptyAllQueue
}