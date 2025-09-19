import e from "express";
import UserController from "../controllers/user.controller.js";
import authToken from "../middlewares/authToken.js";
import { confirmAdminPassword } from "../middlewares/confirmAdminPassword.js";

const userRouter = e.Router()
userRouter.post("/invite", authToken, confirmAdminPassword, UserController.inviteUser)
userRouter.get("/get/user/:id", UserController.getUserById)
userRouter.get("/get/users", UserController.getAllUsers)



export default userRouter