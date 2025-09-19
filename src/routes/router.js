import e from "express";
import authRouter from "./auth.routes.js";
import userRouter from "./user.routes.js";
import caseRouter from "./case.routes.js";
import expenditureRouter from "./expenditure.routes.js";
import noteRouter from "./note.routes.js";

const router = e.Router()
router.use('/auth', authRouter)
router.use('/admin', userRouter)
router.use('/case', caseRouter)
router.use('/expenditure', expenditureRouter)
router.use('/note', noteRouter)

export default router 