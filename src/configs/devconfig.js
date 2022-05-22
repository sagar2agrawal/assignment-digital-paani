// All Configuration related to DEV environment config
const devConfig = {
    APP: {
        PORT: process.env.APP_PORT, //
    },
    DB: {
        URI: process.env.MONGODB_URI
    },
    LOG: { //
        LEVEL: process.env.LOG_LEVEL || "debug"
    },
    JOBS: { //
        REDIS_HOSTNAME: process.env.REDIS_HOSTNAME, //
        REDIS_USERNAME: process.env.REDIS_USERNAME, //
        REDIS_PASSWORD: process.env.REDIS_PASSWORD,
        REDIS_PORT: process.env.REDIS_PORT
    },
    JWT: { //
        SECRET: process.env.JWT_SECRET || "somerandomsecret"
    }
};

export default devConfig;