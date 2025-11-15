const e = require("express");
const AuthController = require("../controllers/auth.controller.js");
const authToken = require("../middlewares/authToken.js");
const checkRole = require("../middlewares/checkRole.js");

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



module.exports = authRouter;