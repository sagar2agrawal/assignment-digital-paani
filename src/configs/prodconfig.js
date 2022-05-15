// All Configuration related to PROD environment config
const prodConfig = {
    APP: {
        PORT: process.env.APP_PORT, //
    },
    DB: {
        URI: process.env.MONGODB_URI
    }
};

export default prodConfig;