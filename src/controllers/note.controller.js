const noteService = require("../services/note.service.js");

class NoteController {
  async getByCase(req, res) {
    try {
      const { caseId } = req.params;
      const notes = await noteService.getByCaseId(caseId);
      return res.status(200).json({ status: "ok", payload: notes });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: "error", message: "Something went wrong!" });
    }
  }

  async add(req, res) {
    try {
      const { caseId } = req.params;
      const note = await noteService.add(caseId, req.body);
      return res.status(201).json({ status: "ok", payload: note });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: "error", message: "Something went wrong!" });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const note = await noteService.update(id, req.body);
      return res.status(200).json({ status: "ok", payload: note });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: "error", message: "Something went wrong!" });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await noteService.delete(id);
      return res.status(200).json({ status: "ok", payload: deleted,message: "Note deleted" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: "error", message: "Something went wrong!" });
    }
  }
}

module.exports = new NoteController();