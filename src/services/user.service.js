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
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        role: true,
        status: true,
        _count: {
          select: {
            cases: {
              where: {
                status: { notIn: ["canceled", "closed"] }
              },
            },
          },
        },
      },
    });
  }

  async delete(id) {
    return await prisma.user.delete({ where: { id: +id } })
  }

  async updateUser(id, data) {
    return await prisma.user.update({
      where: { id: +id }, 
      data: data,
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        role: true,
      }
    })
  }
}

export default new UserService();