const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const env = require("dotenv");

const prisma = new PrismaClient()
env.config()

const main = async () => {
    const email = process.env.ADMIN_LOGIN
    const password = process.env.ADMIN_PASSWORD
    try {

        const isExist = await prisma.user.findUnique({ where: { email } })

        if (isExist) {
            console.log("Admin already exist")
            return
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await prisma.user.create({
            data: {
                first_name: 'Ադմին',
                last_name: '',
                email,
                role: 'admin',
                status: 'active',
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