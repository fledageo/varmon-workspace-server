const FileService = require("../services/file.service.js");

class FileController {

  async uploadCaseFile(req, res) {
    try {
      const file = req.file;
      const caseNumber = req.body.caseNumber;
      const caseId = req.params.id;


      if (!file) {
        return res.status(400).json({ status: "error", message: "No file uploaded" });
      }
      const createdFile = await FileService.uploadFile(file, caseId, caseNumber);
      return res.json({ status: "ok", payload: createdFile })
    } catch (err) {
      console.error(err)
      res.status(500).json({ status: "error", message: "Something went wrong" })
    }
  }

  async getCaseFiles(req, res) {
    try {
      const files = await FileService.getCaseFiles(req.params.caseId);
      return res.json({ status: "ok", payload: files })
    } catch (err) {
      console.error(err)
      res.status(500).json({ status: "error", message: "Something went wrong" })
    }
  }

  async deleteCaseFile(req, res) {
    try {
      await FileService.deleteFile(req.params.id);
      return res.json({ status: "ok", message: "File deleted" })
    } catch (err) {
      console.error(err)
      res.status(500).json({ status: "error", message: "Something went wrong" })
    }
  }

  async downloadCaseFile(req, res) {
    try {
      const file = await FileService.getFileById(req.params.id);
      if(!file) {
        return res.status(404).json({ status: "error", message: "File not found" });
      }
      const fileData = await FileService.downloadFile(file.file_url);
      
      const contentType = fileData.ContentType || "application/octet-stream";
      res.setHeader("Content-Type", contentType);
  
      const safeFileName = encodeURIComponent(file.file_name);
      res.setHeader("Content-Disposition", `attachment; filename="${safeFileName}"`);

      fileData.Body.pipe(res)

    } catch (err) {
      console.error(err)
      res.status(500).json({ status: "error", message: "Something went wrong" })
    }
  }
}

module.exports = new FileController();