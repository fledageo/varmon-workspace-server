import prisma from "../../prisma/prismaClient.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
