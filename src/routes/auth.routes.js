import e from "express";
import AuthController from "../controllers/auth.controller.js";
import authToken from "../middlewares/authToken.js";

const authRouter = e.Router()
authRouter.post("/login", AuthController.login)
authRouter.post("/activate", AuthController.activateUser)
authRouter.get("/current", authToken, AuthController.getCurrentUser)



export default authRouter