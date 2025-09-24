import express from "express";
import noteController from "../controllers/note.controller.js";
import authToken from "../middlewares/authToken.js";

const noteRouter = express.Router();

noteRouter.get("/get/all/case/:caseId", authToken, noteController.getByCase);
noteRouter.post("/add/case/:caseId", authToken, noteController.add);
noteRouter.put("/:id", authToken, noteController.update);
noteRouter.delete("/:id", authToken, noteController.delete);

export default noteRouter;