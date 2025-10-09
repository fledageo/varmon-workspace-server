import e from "express";
import StatsController from "../controllers/stats.controller.js";
import authToken from "../middlewares/authToken.js";
import checkRole from "../middlewares/checkRole.js";

const statsRouter = e.Router();

statsRouter.get("/", authToken, checkRole(["admin"]), StatsController.getStats);
statsRouter.get("/year/profit", authToken, checkRole(["admin"]), StatsController.getYearlyProfit);


export default statsRouter;