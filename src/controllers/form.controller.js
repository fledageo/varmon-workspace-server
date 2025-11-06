import publicFormService from "../services/publicForm.service.js";

class FormController {  
    submitForm = async (req, res) => {
      try {
        const data = req.body;  
        const createdNotification = await publicFormService.addNotification(data);
        return res.status(200).json({ status: "ok", payload: data }); 
      } catch (err) {
        console.error(err);
        return res.status(500).json({ status: "error", message: "Failed to submit form" });
      }
    };
  
    getFormSubmissions = async (req, res) => {
      try {
        const data = await publicFormService.getFormSubmissions();
        return res.status(200).json({ status: "ok", payload: data });
      } catch (err) {
        console.error(err);
        return res.status(500).json({ status: "error", message: "Failed to fetch submissions" });
      }
    };

    deleteNotification = async (req, res) => {
      try {
        const { id } = req.params;
        const deletedNotification = await publicFormService.deleteNotification(id);
        return res.status(200).json({status: "ok", message: "The notification deleted"});
      } catch (err) {
        console.error(err);
        return res.status(500).json({ status: "error", message: "Failed to fetch submissions" });
      }
    }
  }
  
  export default new FormController();
  