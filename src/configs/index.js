import devConfig from "./devconfig.js";
import prodConfig from "./prodconfig.js";

const config = process.env.NODE_ENV === "PROD"? prodConfig : devConfig;

export default config;