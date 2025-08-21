import e from "express";
import authRouter from "./authRouter.js";
import userRouter from "./userRouter.js";

const router = e.Router()
router.use('/auth', authRouter)
router.use('/user', userRouter)

export default router 