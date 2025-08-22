import e from "express";
import UserController from "../controllers/UserController.js";

const userRouter = e.Router()
userRouter.post("/invite", UserController.inviteUser)
userRouter.get("/get/:id", UserController.getUserById)
userRouter.get("/current", UserController.getCurrentUser)



export default userRouter