import e from "express";
import UserController from "../controllers/user.controller.js";
import authToken from "../middlewares/authToken.js";
import checkRole from "../middlewares/checkRole.js";

const userRouter = e.Router()

userRouter.get("/all", authToken, checkRole(["admin"]), UserController.getAllUsers)
userRouter.get("/:id", authToken, checkRole(["admin"]), UserController.getUserById)
userRouter.delete("/:id", authToken, checkRole(["admin"]), UserController.deleteUser)
userRouter.put("/:id", authToken, UserController.updateUser)




export default userRouter