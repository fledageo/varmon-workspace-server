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

  async getCases(req, res) {
    try {
      const cases = await caseService.getAllCases();
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
    const {status} = req.body

    try {
      const updatedCase = await caseService.changeStatus(req.params.id, status)
      return res.status(200).json({ status: "ok", payload: updatedCase });
    } catch (error) {
      console.error(error);
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

  async getStats(req, res) {
    try {
      const stats = await caseService.getCasesStats()

      return res.json({ status: "ok", payload: stats })
    } catch (err) {
      console.error(err)
      res.status(500).json({ status: "error", message: "Something went wrong" })
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
}

export default new CaseController();