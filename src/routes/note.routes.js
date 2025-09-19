import express from "express";
import noteController from "../controllers/note.controller.js";

const noteRouter = express.Router();

noteRouter.get("/get/all/case/:caseId", noteController.getByCase);
noteRouter.post("/add/case/:caseId", noteController.add);
noteRouter.put("/:id", noteController.update);
noteRouter.delete("/:id", noteController.delete);

export default noteRouter;