const { PrismaClient } = require('@prisma/client');
const casesData = require("./SeedData/cases.js");

const prisma = new PrismaClient()

async function main() {
  
  for (const caseItem of casesData) {
    await prisma.case.create({ data: caseItem })
  }

  console.log('Cases seeded.')
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
