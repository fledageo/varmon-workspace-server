import e from "express";
import authRouter from "./auth.routes.js";
import userRouter from "./user.routes.js";
import caseRouter from "./case.routes.js";
import fileRouter from "./file.route.js";
import expenditureRouter from "./expenditure.routes.js";
import noteRouter from "./note.routes.js";
import statsRouter from "./stats.routes.js";
import mainPageRouter from "./mainPage.routes.js";

const router = e.Router()
router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/cases', caseRouter)
router.use('/file', fileRouter)
router.use('/expenditure', expenditureRouter)
router.use('/note', noteRouter)
router.use('/stats', statsRouter)
router.use('/main', mainPageRouter)


export default router 