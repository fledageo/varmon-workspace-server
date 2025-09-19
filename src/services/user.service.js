import prisma from "../../prisma/prismaClient.js";
import jwt from "jsonwebtoken";
import sendMail from "../utils/mailSender.js";

class UserService {
  async inviteUser(newUser) {
    const isExist = await prisma.user.findUnique({ where: { email: newUser.email } });
    if (isExist) throw new Error("User with this email already exists");

    const createdUser = await prisma.user.create({
      data: {
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true
      }
    });

    const activationToken = jwt.sign({ id: createdUser.id }, process.env.SECRET_KEY, { expiresIn: "1h" });

    const sent = await sendMail(createdUser.id, createdUser.email, activationToken, "invite");
    if (!sent) throw new Error("Failed to send invite email");

    return createdUser;
  }

  async getUserById(id) {
    const user = await prisma.user.findUnique({
      where: { id: +id },
      select: { id: true, first_name: true, last_name: true, email: true }
    });
    if (!user) throw new Error("User with this id not found");
    return user;
  }

  async getAllUsers() {
    return await prisma.user.findMany({
      where: { role: { not: "admin" } },
      select: { id: true, first_name: true, last_name: true, email: true, role: true }
    });
  }
}

export default new UserService();