const e = require("express");
const authRouter = require("./auth.routes.js");
const userRouter = require("./user.routes.js");
const caseRouter = require("./case.routes.js");
const fileRouter = require("./file.route.js");
const expenditureRouter = require("./expenditure.routes.js");
const noteRouter = require("./note.routes.js");
const statsRouter = require("./stats.routes.js");
const mainPageRouter = require("./mainPage.routes.js");

const router = e.Router()
router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/cases', caseRouter)
router.use('/file', fileRouter)
router.use('/expenditure', expenditureRouter)
router.use('/note', noteRouter)
router.use('/stats', statsRouter)
router.use('/main', mainPageRouter)


module.exports = router;