import e from "express";
import CaseController from "../controllers/case.controller.js";
import authToken from "../middlewares/authToken.js";
import checkRole from "../middlewares/checkRole.js";
import { confirmAdminPassword } from "../middlewares/confirmAdminPassword.js";

const caseRouter = e.Router();

caseRouter.post("/add", authToken, checkRole(["admin"]), CaseController.addCase);
caseRouter.get("/get/all", authToken, checkRole(["admin"]), CaseController.getCases);
caseRouter.get("/get/stats", authToken, checkRole(["admin"]), CaseController.getStats);
caseRouter.get("/get/complated", authToken, CaseController.getReadyToReviewCases);
caseRouter.get("/get/:id", authToken, CaseController.getCaseById);
caseRouter.delete("/delete/:id", authToken, checkRole(["admin"]), CaseController.deleteCase);
caseRouter.patch("/update/status/:id", authToken, CaseController.changeCaseStatus);
caseRouter.put("/update/:id", authToken, CaseController.updateCase);

export default caseRouter;