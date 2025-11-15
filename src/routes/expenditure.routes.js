const express = require("express");
const expendituresController = require("../controllers/expenditures.controller.js");
const authToken = require("../middlewares/authToken.js");

const expenditureRouter = express.Router();

expenditureRouter.get("/get/all/case/:caseId", authToken, expendituresController.getByCase);
expenditureRouter.post("/add/case/:caseId", authToken, expendituresController.add);
expenditureRouter.put("/:id", authToken, expendituresController.update);
expenditureRouter.delete("/:id", authToken, expendituresController.delete);

module.exports = expenditureRouter;