import e from "express";
import AuthController from "../controllers/AuthController.js";

const authRouter = e.Router()
authRouter.post("/login", AuthController.login)
authRouter.get("/user", AuthController.getCurrentUser)



export default authRouter