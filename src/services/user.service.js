import prisma from "../../prisma/prismaClient.js";


class UserService {

  async getUserById(id) {
    const user = await prisma.user.findUnique({
      where: { id: +id },
      select: { id: true, first_name: true, last_name: true, email: true, status: true }
    });
    if (!user) throw new Error("User with this id not found");
    return user;
  }

  async getAllUsers() {
    return await prisma.user.findMany({
      where: { role: { not: "admin" } },
      select: { id: true, first_name: true, last_name: true, email: true, role: true, status: true }
    });
  }

  async delete(id) {
    return await prisma.user.delete({where: {id: +id}})
  }
}

export default new UserService();