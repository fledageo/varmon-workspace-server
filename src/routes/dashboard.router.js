import e from "express";
import authToken from "../middlewares/authToken.js";
import checkRole from "../middlewares/checkRole.js";
import dashboardController from "../controllers/dashboard.controller.js";

const dashboardRouter = e.Router();

dashboardRouter.get("", authToken, checkRole("admin"), dashboardController.getDashboardData)

export default dashboardRouter;