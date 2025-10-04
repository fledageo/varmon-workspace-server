import e from "express";
import AuthController from "../controllers/auth.controller.js";
import authToken from "../middlewares/authToken.js";

const authRouter = e.Router()
authRouter.post("/login", AuthController.login)
authRouter.post("/activate", AuthController.activateUser)
authRouter.get("/current", authToken, AuthController.getCurrentUser)
authRouter.post("/logout", authToken, AuthController.logout)


export default authRouter