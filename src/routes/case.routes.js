import e from "express";
import CaseController from "../controllers/case.controller.js";
import authToken from "../middlewares/authToken.js";
import { confirmAdminPassword } from "../middlewares/confirmAdminPassword.js";

const caseRouter = e.Router()
caseRouter.post("/add", authToken, confirmAdminPassword, CaseController.addCase)
caseRouter.get("/get/all", CaseController.getCases)
caseRouter.get("/get/:id", CaseController.getCaseById)
caseRouter.delete("/delete/:id", authToken, confirmAdminPassword, CaseController.deleteCase)
caseRouter.put("/update/:id", CaseController.updateCase)



export default caseRouter