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

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const deleted = await userService.delete(id);
      return await res.status(200).json({status: 'ok', message: "User deleted", payload: deleted});
    } catch (error) {
      console.error(error);
      return await res.status(500).json({status: "error", message: error.message})
    }
  }

  async updateUser(req, res) {
    try {
      const updatedUser = await userService.updateUser(req.params.id, req.body);
      return res.status(200).json({ status: "ok", payload: updatedUser });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: "error", message: "Something went wrong!" });
    }
  }
}

export default new UserController();