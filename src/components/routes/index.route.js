import Router from "express";
import taskRoutes from "./task.route.js";

const indexRouter = new Router();

indexRouter.use("/", taskRoutes);

export default indexRouter;