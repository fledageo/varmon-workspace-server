import e from "express";
import authToken from "../middlewares/authToken.js";
import checkRole from "../middlewares/checkRole.js";
import MainPageDataController from "../controllers/mainPage.controller.js";

const mainPageRouter = e.Router();

mainPageRouter.get("/dashboard", authToken, checkRole("admin"), MainPageDataController.getDashboardData)
mainPageRouter.get("/profile/:userId", authToken, MainPageDataController.getProfileData)

export default mainPageRouter;