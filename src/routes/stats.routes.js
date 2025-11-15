const e = require("express");
const StatsController = require("../controllers/stats.controller.js");
const authToken = require("../middlewares/authToken.js");
const checkRole = require("../middlewares/checkRole.js");

const statsRouter = e.Router();

statsRouter.get("/", authToken, checkRole(["admin"]), StatsController.getStats);
statsRouter.get("/:userId", authToken, StatsController.getUserStats);
statsRouter.get("/year/profit", authToken, checkRole(["admin"]), StatsController.getYearlyProfit);
statsRouter.get("/year/cases", authToken, checkRole(["admin"]), StatsController.getYearlyCasesCount);
statsRouter.get("/user/year/cases/:userId", authToken, StatsController.getUserYearlyCasesCount);


module.exports = statsRouter;