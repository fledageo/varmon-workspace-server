import express from "express";
import expendituresController from "../controllers/expenditures.controller.js";

const expenditureRouter = express.Router();

expenditureRouter.get("/get/all/case/:caseId", expendituresController.getByCase);
expenditureRouter.post("/add/case/:caseId", expendituresController.add);
expenditureRouter.put("/:id", expendituresController.update);
expenditureRouter.delete("/:id", expendituresController.delete);

export default expenditureRouter;