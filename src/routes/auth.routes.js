import e from "express";
import AuthController from "../controllers/auth.controller.js";
import authToken from "../middlewares/authToken.js";
import checkRole from "../middlewares/checkRole.js";

const authRouter = e.Router()
authRouter.post("/login", AuthController.login)
authRouter.post("/invite", authToken, checkRole(["admin"]), AuthController.inviteUser)
authRouter.post("/forgot-password", AuthController.sendResetPasswordToken)
authRouter.post("/activate", AuthController.activateUser)
authRouter.get("/current", authToken, AuthController.getCurrentUser)
authRouter.post("/logout", authToken, AuthController.logout)
authRouter.patch("/reset-password", AuthController.resetPassword)
authRouter.patch("/update-password", authToken, AuthController.updatePassword)
authRouter.get("/verify-token", AuthController.verifyToken)



export default authRouter