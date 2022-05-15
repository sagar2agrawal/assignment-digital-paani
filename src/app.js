import 'dotenv/config';
import config from "./configs/index.js";
import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";

// Loading all Routes
import indexRouter from "./components/routes/index.route.js";

// Loading DB connectors
import connectDB from "./components/helpers/mongodb-connector.js";
import { logger } from './components/helpers/index.helper.js';

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(helmet());

app.use((err, req, res, next) => {
    console.log("my error: ", err) 
});
// Mounting the routes on /api
app.use('/api', indexRouter);

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
}
