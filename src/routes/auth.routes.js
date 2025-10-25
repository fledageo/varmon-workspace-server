import e from "express";
import AuthController from "../controllers/auth.controller.js";
import authToken from "../middlewares/authToken.js";
import checkRole from "../middlewares/checkRole.js";

const authRouter = e.Router()
authRouter.post("/login", AuthController.login)
authRouter.post("/forgot-password", AuthController.sendResetPasswordToken)
authRouter.post("/activate", AuthController.activateUser)
authRouter.patch("/reset-password", AuthController.resetPassword)
authRouter.get("/verify-token", AuthController.verifyToken)
authRouter.get("/current", authToken, AuthController.getCurrentUser)
authRouter.post("/logout", authToken, AuthController.logout)
authRouter.post("/invite", authToken, checkRole(["admin"]), AuthController.inviteUser)
authRouter.patch("/update-password", authToken, AuthController.updatePassword)



export default authRouter