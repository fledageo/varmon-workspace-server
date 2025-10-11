import e from "express";
import CaseController from "../controllers/case.controller.js";
import authToken from "../middlewares/authToken.js";
import checkRole from "../middlewares/checkRole.js";

const caseRouter = e.Router();

caseRouter.post("/", authToken, checkRole(["admin"]), CaseController.addCase);

caseRouter.get("/current", authToken, checkRole(["admin"]), CaseController.getCurrentCases);
caseRouter.get("/complated", authToken, CaseController.getReadyToReviewCases);
caseRouter.get("/unpaid", authToken,checkRole(["admin"]), CaseController.getUnpaidCases);
caseRouter.get("/get/waiting", authToken,checkRole(["admin"]), CaseController.getWaitingCases);
caseRouter.get("/case/:id", authToken, CaseController.getCaseById);
caseRouter.get("/archive", authToken, CaseController.getArchiveCases);


caseRouter.delete("/case/:id", authToken, checkRole(["admin"]), CaseController.deleteCase);
caseRouter.patch("/status/:id", authToken, CaseController.changeCaseStatus);
caseRouter.patch("/paid/:id", authToken, checkRole(["admin"]), CaseController.toggleCasePaid);
caseRouter.put("/:id", authToken, CaseController.updateCase);
caseRouter.patch("/assign/:id", authToken, checkRole(["admin"]), CaseController.assignedCase);

export default caseRouter;