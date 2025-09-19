import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
async function main() {
    // 10 Users
    const usersData = [
        { first_name: 'Դավիթ', last_name: 'Գևորգյան', email: 'user1@gmail.com', role: 'user', status: 'active' },
        { first_name: 'Անի', last_name: 'Սարգսյան', email: 'user2@gmail.com', role: 'user', status: 'active' },
        { first_name: 'Միքայել', last_name: 'Պետրոսյան', email: 'user3@gmail.com', role: 'user', status: 'active' },
        { first_name: 'Լիլիթ', last_name: 'Հովհաննիսյան', email: 'user4@gmail.com', role: 'user', status: 'active' },
        { first_name: 'Նարեկ', last_name: 'Սարգսյան', email: 'user5@gmail.com', role: 'user', status: 'active' },
        { first_name: 'Աշոտ', last_name: 'Միքայելյան', email: 'user6@gmail.com', role: 'user', status: 'active' },
        { first_name: 'Մհեր', last_name: 'Հովհաննիսյան', email: 'user7@gmail.com', role: 'user', status: 'active' },
        { first_name: 'Սոֆյա', last_name: 'Գրիգորյան', email: 'user8@gmail.com', role: 'user', status: 'active' },
        { first_name: 'Արսեն', last_name: 'Գրիգորյան', email: 'user9@gmail.com', role: 'user', status: 'active' },
        { first_name: 'Մանե', last_name: 'Պետրոսյան', email: 'user10@gmail.com', role: 'user', status: 'active' },
    ]

    await prisma.user.createMany({
        data: usersData,
        skipDuplicates: true, // won't insert if email already exists
    })

    console.log('Users seeded.')
}

main()
    .catch((e) => console.error(e))
    .finally(async () => {
        await prisma.$disconnect()
    })