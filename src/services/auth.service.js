import prisma from "../../prisma/prismaClient.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendMail from "../utils/mailSender.js";

class AuthService {
  async login(email, password) {
    const trimmedEmail = email.trim().toLowerCase();
    const foundUser = await prisma.user.findUnique({ where: { email: trimmedEmail } });

    if (!foundUser) {
      throw new Error("INVALID_CREDENTIALS");
    }

    const isPasswordValid = await bcrypt.compare(password, foundUser.password);
    if (!isPasswordValid) {
      throw new Error("INVALID_CREDENTIALS");
    }

    const accessToken = jwt.sign(
      { user_id: foundUser.id, role: foundUser.role },
      process.env.SECRET_KEY,
      { expiresIn: '4h' }
    );

    const { password: _, ...user } = foundUser;

    return { user, accessToken };
  }

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

  async activateUser(token, passwordData) {
    const { id } = jwt.decode(token, process.env.SECRET_KEY);

    const foundUser = await prisma.user.findUnique({ where: { id } });
    if (!foundUser) throw new Error("USER_NOT_FOUND");
    if (foundUser.status === "active") throw new Error("USER_ALREADY_ACTIVATED");

    const hashedPassword = await bcrypt.hash(passwordData.password, 10);

    await prisma.user.update({
      where: { id },
      data: {
        status: 'active',
        password: hashedPassword,
      }
    });

    return { success: true };
  }

  async getCurrentUser(userId) {
    const foundUser = await prisma.user.findUnique({
      where: { id: +userId },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        role: true
      }
    });

    if (!foundUser) throw new Error("USER_NOT_FOUND");

    return foundUser;
  }
}

export default new AuthService();
