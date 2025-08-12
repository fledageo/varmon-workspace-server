import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"


const prisma = new PrismaClient()

const main = async () => {
    const username = "admin"
    const password = "varmonAdmin123"
    try {

        const isExist = await prisma.user.findUnique({ where: { username } })

        if (isExist) {
            console.log("Admin already exist")
            return
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await prisma.user.create({
            data: {
                first_name: 'Վարմօն',
                last_name: 'Ադմին',
                username,
                role: 'admin',
                password: hashedPassword,
            }
        })

        console.log("Admin user created")

    } catch (error) {
        throw new Error("something went wrong!", error)
    }

}

main()