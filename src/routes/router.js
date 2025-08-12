import e from "express";
import authRouter from "./authRouter.js";

const router = e.Router()
router.use('/auth', authRouter)

export default router 