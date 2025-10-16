import e from "express";
import StatsController from "../controllers/stats.controller.js";
import authToken from "../middlewares/authToken.js";
import checkRole from "../middlewares/checkRole.js";

const statsRouter = e.Router();

statsRouter.get("/", authToken, checkRole(["admin"]), StatsController.getStats);
statsRouter.get("/:userId", authToken, StatsController.getUserStats);
statsRouter.get("/year/profit", authToken, checkRole(["admin"]), StatsController.getYearlyProfit);
statsRouter.get("/year/cases", authToken, checkRole(["admin"]), StatsController.getYearlyCasesCount);
statsRouter.get("/user/year/cases/:userId", authToken, StatsController.getUserYearlyCasesCount);


export default statsRouter;