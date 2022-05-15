import Queue from "bull";
import config from "../../configs/index.js";


const taskReassignSchedulerQueue = new Queue('taskReAssign', {
    redis: {
        host: config.JOBS.REDIS_HOSTNAME,
        username: config.JOBS.REDIS_USERNAME, //
        password: config.JOBS.REDIS_PASSWORD //
    }
});



export {

}