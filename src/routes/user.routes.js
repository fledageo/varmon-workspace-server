import e from "express";
import UserController from "../controllers/user.controller.js";

const userRouter = e.Router()

userRouter.get("/all", UserController.getAllUsers)
userRouter.get("/:id", UserController.getUserById)




export default userRouter