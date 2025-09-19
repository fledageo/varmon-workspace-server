import bcrypt from "bcrypt";
import prisma from "../../prisma/prismaClient.js"; 

export const confirmAdminPassword = async (req, res, next) => {
  try {
    const { admin_password } = req.body;
    const adminId = req.user.user_id; 

    if (!admin_password) {
      return res.status(400).json({ status: "error", message: "Admin password is required" });
    }
    const admin = await prisma.user.findUnique({
      where: { id: adminId },
      select: { password: true }
    });

    if (!admin) {
      return res.status(404).json({ status: "error", message: "Admin not found" });
    }

    const isValid = await bcrypt.compare(admin_password, admin.password); 
    if (!isValid) {
      return res.status(403).json({ status: "error", message: "Invalid password confirmation" });
    }

    next(); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "Something went wrong" });
  }
};