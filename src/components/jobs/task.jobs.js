import Queue from "bull";
import config from "../../configs/index.js";
import { logger } from "../helpers/index.helper.js";

const redisConnector = {
    host: config.JOBS.REDIS_HOSTNAME,
    port: config.JOBS.REDIS_PORT,
    username: config.JOBS.REDIS_USERNAME, //
    password: config.JOBS.REDIS_PASSWORD //
};

const taskReassignSchedulerQueue = new Queue('taskReAssign', {
    redis: redisConnector
});

taskReassignSchedulerQueue.process((job, done) => {
    // Get all tasks with overdue date
    // Get member with less load
    // Assign member the task
    logger.logger.info(job.data, job.id);
    done();
});

const taskReAssignCreateQueue = async (taskDetails) => {
    await taskReassignSchedulerQueue.add({}, {
        removeOnComplete: true,
        repeat: {
            every: 10000,
            limit: 100,
          }
    });
}


// Notify user about the reassignment
taskReassignSchedulerQueue.on('completed', () => { 

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