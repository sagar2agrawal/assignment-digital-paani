import 'dotenv/config';
import config from "./configs/index.js";
import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";

// Loading all Routes
import indexRouter from "./components/routes/index.route.js";

// Loading DB connectors
import connectDB from "./components/helpers/mongodb-connector.js";
import { logger } from "./components/helpers/index.helper.js";

// Loading all crons jobs
import { taskJobs } from "./components/jobs/index.jobs.js";

const app = express();

// Jobs that check if task is overdue and assigned to member with less load
taskJobs.taskReAssignEmptyAllQueue()
taskJobs.taskReAssignCreateQueue();



app.use(cookieParser());
app.use(express.urlencoded({extended : true}))
app.use(express.json());
app.use(express.text({
    
}));

app.use(helmet());

// Mounting the routes on /api
app.use('/api', indexRouter);

app.use((err, req, res, next) => {
    logger.logger.error(`${err.message}`);
    res.json({ status: "failed", message: err.message }); 
});

try {
    let isDBConnected = await connectDB(config.DB.URI);
    if (isDBConnected) { 
        logger.logger.info("DB Connection established");    
    
        app.listen(config.APP.PORT, () => {
            logger.logger.info(`APP Started listening on PORT: ${config.APP.PORT}`);
        });
    }    
} catch (err) {
    logger.logger.error("Database not able to connect or APP not started properly");
    logger.logger.error(err);
}
