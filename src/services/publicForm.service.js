import prisma from "../../prisma/prismaClient.js";

class PublicService {
    async getFormSubmissions() {
        return await prisma.notification.findMany({
            select: {
                id: true,
                first_name: true,
                last_name: true,
                email: true,
                phone: true
            }
        })
    }

    async addNotification(data) {
        return await prisma.notification.create({
            data
        })
    }

    async deleteNotification(id) {
        return await prisma.notification.delete({
            where:{id: +id}
        })
    }
}

export default new PublicService();