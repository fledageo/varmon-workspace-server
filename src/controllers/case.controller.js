import caseService from "../services/case.service.js";

class CaseController {
  async addCase(req, res) {
    try {
      const createdCase = await caseService.createCase(req.body.caseData);
      return res.status(200).json({ status: "ok", payload: createdCase });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: "error", message: "Something went wrong!" });
    }
  }

  async getCurrentCases(req, res) {
    try {
      const cases = await caseService.getCurrentCases();
      return res.status(200).json({ status: "ok", payload: cases });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: "error", message: "Something went wrong!" });
    }
  }


  async getCaseById(req, res) {
    try {
      const caseData = await caseService.getCaseById(req.params.id);
      return res.status(200).json({ status: "ok", payload: caseData });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: "error", message: "Something went wrong!" });
    }
  }

  async updateCase(req, res) {
    try {
      const updatedCase = await caseService.updateCase(req.params.id, req.body);
      return res.status(200).json({ status: "ok", payload: updatedCase });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: "error", message: "Something went wrong!" });
    }
  }

  async changeCaseStatus(req, res) {
    const { status } = req.body

    try {
      const updatedCase = await caseService.changeStatus(req.params.id, status)
      return res.status(200).json({ status: "ok", payload: updatedCase });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: "error", message: "Something went wrong!" });
    }
  }

  async toggleCasePaid(req, res) {
    try {
      const updatedCase = await caseService.toggleCasePaid(req.params.id)
      return res.status(200).json({ status: "ok", payload: updatedCase });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: "error", message: "Something went wrong!" });
    }
  }

  async assignedCase(req, res) {
    try {
      const { id } = req.params;
      const { assignUserId } = req.body;
      const updateCase = await caseService.assignedCase(id, assignUserId);
      return res.status(200).json({ status: "ok", payload: updateCase});
    } catch (error) {
      console.error(error)
      return res.status(500).json({ status: "error", message: "Something went wrong!" });
    }
  }

  async deleteCase(req, res) {
    try {
      await caseService.deleteCase(req.params.id);
      return res.status(200).json({ status: "ok", message: "Case deleted" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: "error", message: "Something went wrong!" });
    }
  }


  async getReadyToReviewCases(req, res) {
    try {
      const cases = await caseService.getComplatedCases()

      return res.json({ status: "ok", payload: cases })
    } catch (err) {
      console.error(err)
      res.status(500).json({ status: "error", message: "Something went wrong" })
    }
  }


  async getUnpaidCases(req, res) {
    try {
      const cases = await caseService.getUnpaidCases()
      return res.json({ status: "ok", payload: cases })
    } catch (err) {
      console.error(err)
      res.status(500).json({ status: "error", message: "Something went wrong" })
    }
  }

  async getWaitingCases(req, res) {
    try {
      const cases = await caseService.getWaitingCases();
      return res.json({ status: "ok", payload: cases })
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "error", message: "Something went wrong" })
    }
  }

  async uploadCaseFile(req, res) {
    try {
      const file = req.file;
      const caseNumber = req.body.caseNumber;
      const caseId = req.params.id;


      if (!file) {
        return res.status(400).json({ status: "error", message: "No file uploaded" });
      }
      const createdFile = await caseService.uploadCaseFile(file, caseId, caseNumber);
      return res.json({ status: "ok", payload: createdFile })
    } catch (err) {
      console.error(err)
      res.status(500).json({ status: "error", message: "Something went wrong" })
    }
  }

  async getCaseFiles(req, res) {
    try {
      const files = await caseService.getCaseFiles(req.params.id);
      return res.json({ status: "ok", payload: files })
    } catch (err) {
      console.error(err)
      res.status(500).json({ status: "error", message: "Something went wrong" })
    }
  }

  async deleteCaseFile(req, res) {
    try {
      await caseService.deleteCaseFile(req.params.id);
      return res.json({ status: "ok", message: "File deleted" })
    } catch (err) {
      console.error(err)
      res.status(500).json({ status: "error", message: "Something went wrong" })
    }
  }

  async downloadCaseFile(req, res) {
    try {
      const file = await caseService.getFileById(req.params.id);
      if (!file) {
        return res.status(404).json({ status: "error", message: "File not found" });
      }
      const fileData = await caseService.downloadCaseFile(file.file_url);

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


  async getArchiveCases(req, res) {
    try {
      const { page, limit, search, startDate, endDate } = req.query;
      const data = await caseService.getArchiveCases(page, limit, search, startDate, endDate);
      return res.json({ status: "ok", payload: data })
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "error", message: "Something went wrong" })
    }
  }

}

export default new CaseController();