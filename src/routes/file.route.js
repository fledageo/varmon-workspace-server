import e from "express";
import FileController from "../controllers/file.controller.js";
import authToken from "../middlewares/authToken.js";
import upload from "../middlewares/upload.js";

const fileRouter = e.Router();

fileRouter.get("/all/:caseId", authToken, FileController.getCaseFiles);
fileRouter.get("/download/:id", authToken, FileController.downloadCaseFile);
fileRouter.post("/upload/:id", authToken, upload.single('file'), FileController.uploadCaseFile);
fileRouter.delete("/delete/:id", authToken, FileController.deleteCaseFile);


export default fileRouter;