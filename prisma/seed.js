import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"


const prisma = new PrismaClient()

const main = async () => {
    const email = "admin"
    const password = "varmonAdmin123"
    try {

        const isExist = await prisma.user.findUnique({ where: { email } })

        if (isExist) {
            console.log("Admin already exist")
            return
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await prisma.user.create({
            data: {
                first_name: 'Վարմօն',
                last_name: 'Ադմին',
                email,
                role: 'admin',
                password: hashedPassword,
            }
        })

        console.log("Admin user created")

    } catch (error) {
        console.error("Something went wrong!", error);
        process.exit(1);
    }

}

main()