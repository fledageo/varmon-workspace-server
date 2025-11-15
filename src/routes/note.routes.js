const express = require("express");
const noteController = require("../controllers/note.controller.js");
const authToken = require("../middlewares/authToken.js");

const noteRouter = express.Router();

noteRouter.get("/get/all/case/:caseId", authToken, noteController.getByCase);
noteRouter.post("/add/case/:caseId", authToken, noteController.add);
noteRouter.put("/:id", authToken, noteController.update);
noteRouter.delete("/:id", authToken, noteController.delete);

module.exports = noteRouter;