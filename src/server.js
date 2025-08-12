import env from "dotenv"
import express from "express"
import prisma from "../prisma/prismaClient"

env.config()
const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))


process.on("SIGINT", () => {
    prisma.$disconnect();
    process.exit(0)
})