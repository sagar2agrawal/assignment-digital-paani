import pino from "pino";
import config from "../../configs/index.js";

const logger = pino({
    level: config.LOG.LEVEL
});

export {
    logger
}