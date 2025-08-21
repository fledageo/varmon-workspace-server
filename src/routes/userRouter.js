import e from "express";
import UserController from "../controllers/UserController.js";

const userRouter = e.Router()
userRouter.post("/invite", UserController.inviteUser)



export default userRouter