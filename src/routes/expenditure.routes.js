import express from "express";
import expendituresController from "../controllers/expenditures.controller.js";
import authToken from "../middlewares/authToken.js";

const expenditureRouter = express.Router();

expenditureRouter.get("/get/all/case/:caseId", authToken, expendituresController.getByCase);
expenditureRouter.post("/add/case/:caseId", authToken, expendituresController.add);
expenditureRouter.put("/:id", authToken, expendituresController.update);
expenditureRouter.delete("/:id", authToken, expendituresController.delete);

export default expenditureRouter;