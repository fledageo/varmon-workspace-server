const expendituresService = require("../services/expenditure.service.js");

class ExpendituresController {
  async getByCase(req, res) {
    try {
      const { caseId } = req.params;
      const expenditures = await expendituresService.getByCaseId(caseId);
      return res.status(200).json({ status: "ok", payload: expenditures });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: "error", message: "Something went wrong!" });
    }
  }

  async add(req, res) {
    try {
      const { caseId } = req.params;
      const expenditure = await expendituresService.add(caseId, req.body);
      return res.status(201).json({ status: "ok", payload: expenditure });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: "error", message: "Something went wrong!" });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const expenditure = await expendituresService.update(id, req.body);
      return res.status(200).json({ status: "ok", payload: expenditure });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: "error", message: "Something went wrong!" });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await expendituresService.delete(id);
      return res.status(200).json({ status: "ok", payload: deleted,message: "Expenditure deleted" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: "error", message: "Something went wrong!" });
    }
  }
}

module.exports = new ExpendituresController();