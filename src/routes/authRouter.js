import e from "express";
import AuthController from "../controllers/AuthController.js";

const authRouter = e.Router()
authRouter.post("/login", AuthController.login)
authRouter.post("/activate", AuthController.activateUser)



export default authRouter