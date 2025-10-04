import userService from "../services/user.service.js";

class UserController {
  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id);
      return res.status(200).json({ status: "ok", payload: user });
    } catch (error) {
      console.error(error);
      return res.status(404).json({ status: "error", message: error.message });
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      return res.status(200).json({ status: "ok", payload: users });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: "error", message: "Something went wrong!" });
    }
  }
}

export default new UserController();