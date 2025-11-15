const { PrismaClient } = require('@prisma/client');
const usersData = require("./SeedData/users.js");

const prisma = new PrismaClient()
async function main() {
    await prisma.user.createMany({
        data: usersData,
        skipDuplicates: true,
    })

    console.log('Users seeded.')
}

main()
    .catch((e) => console.error(e))
    .finally(async () => {
        await prisma.$disconnect()
    })