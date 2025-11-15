const e = require("express");
const authToken = require("../middlewares/authToken.js");
const checkRole = require("../middlewares/checkRole.js");
const MainPageDataController = require("../controllers/mainPage.controller.js");

const mainPageRouter = e.Router();

mainPageRouter.get("/dashboard", authToken, checkRole("admin"), MainPageDataController.getDashboardData)
mainPageRouter.get("/profile/:userId", authToken, MainPageDataController.getProfileData)

module.exports = mainPageRouter;