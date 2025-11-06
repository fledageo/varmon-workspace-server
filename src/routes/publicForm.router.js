import e from "express";
import FormController from "../controllers/form.controller.js";
import authToken from "../middlewares/authToken.js";
import checkRole from "../middlewares/checkRole.js";

const publicFormRouter = e.Router();

publicFormRouter.post("", FormController.submitForm);
publicFormRouter.get("/notifications", authToken, checkRole(["admin"]), FormController.getFormSubmissions);
publicFormRouter.delete("/delete/:id", authToken, checkRole(["admin"]), FormController.deleteNotification);

export default publicFormRouter;