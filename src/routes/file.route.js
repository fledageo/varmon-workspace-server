const e = require("express");
const FileController = require("../controllers/file.controller.js");
const authToken = require("../middlewares/authToken.js");
const upload = require("../middlewares/upload.js");

const fileRouter = e.Router();

fileRouter.get("/all/:caseId", authToken, FileController.getCaseFiles);
fileRouter.get("/download/:id", authToken, FileController.downloadCaseFile);
fileRouter.post("/upload/:id", authToken, upload.single('file'), FileController.uploadCaseFile);
fileRouter.delete("/delete/:id", authToken, FileController.deleteCaseFile);


module.exports = fileRouter;