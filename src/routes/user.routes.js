import e from "express";
import UserController from "../controllers/user.controller.js";
import authToken from "../middlewares/authToken.js";


const userRouter = e.Router()

userRouter.get("/all", authToken, UserController.getAllUsers)
userRouter.get("/:id", authToken, UserController.getUserById)
userRouter.delete("/:id", authToken, UserController.deleteUser)




export default userRouter