const prisma = require("../../prisma/prismaClient.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../utils/mailer.js");
const logger = require("../utils/logger.js");

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
    if (isExist) return null;

    const createdUser = await prisma.user.create({
      data: {
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        status: 'inactive'
      },
      select: { id: true, first_name: true, last_name: true, email: true, status: true },
    });

    const token = jwt.sign({ id: createdUser.id, email: createdUser.email }, process.env.SECRET_KEY, { expiresIn: '7d' });

    try {
      await sendMail(createdUser.id, createdUser.email, token, 'invite');
      return createdUser;
    } catch (err) {
      try {
        await prisma.user.delete({ where: { id: createdUser.id } });
        logger.info(`inviteUser: rolled back (deleted) user ${createdUser.id}`);
      } catch (delErr) {
        logger.error(`inviteUser rollback failed for ${createdUser.id}: ${delErr && delErr.stack ? delErr.stack : delErr}`);
      }
      throw err;
    }
  }


  async sendResetPasswordToken(email) {
    const foundUser = await prisma.user.findUnique({ where: { email } });
    if (!foundUser) throw new Error("USER_NOT_FOUND");

    const resetToken = jwt.sign({ id: foundUser.id }, process.env.SECRET_KEY, { expiresIn: "1h" });
    const sent = await sendMail(foundUser.id, foundUser.email, resetToken, "reset");

    if (!sent) throw new Error("Failed to send reset email");
    return foundUser;
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
        role: true,
        email: true
      }
    });

    if (!foundUser) throw new Error("USER_NOT_FOUND");

    return foundUser;
  }

  async resetPassword(token, password) {
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      const user = await prisma.user.findUnique({ where: { id: decoded.id } });
      if (!user) throw new Error("USER_NOT_FOUND");

      const hashedPassword = await bcrypt.hash(password, 10);

      await prisma.user.update({
        where: { id: decoded.id },
        data: { password: hashedPassword },
      });

      return true;
    } catch (error) {
      throw error;
    }
  }

  async verifyToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      return decoded;
    } catch (error) {
      throw error;
    }
  }

  async updatePassword(userId, oldPassword, newPassword) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return { status: "error", message: "User not found" };

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) return { status: "error", message: "Invalid old password" };

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return { status: "ok", message: "Password updated successfully" };
  }
}

module.exports = new AuthService();
