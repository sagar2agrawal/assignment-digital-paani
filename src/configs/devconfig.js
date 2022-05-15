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
    }
};

export default devConfig;