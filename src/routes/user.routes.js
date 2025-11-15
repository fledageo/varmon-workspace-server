const e = require("express");
const UserController = require("../controllers/user.controller.js");
const authToken = require("../middlewares/authToken.js");
const checkRole = require("../middlewares/checkRole.js");

const userRouter = e.Router()

userRouter.get("/all", authToken, checkRole(["admin"]), UserController.getAllUsers)
userRouter.get("/:id", authToken, checkRole(["admin"]), UserController.getUserById)
userRouter.get("/activation/:userId", UserController.getUserActivation)
userRouter.delete("/:id", authToken, checkRole(["admin"]), UserController.deleteUser)
userRouter.put("/:id", authToken, UserController.updateUser)




module.exports = userRouter;