import env from "dotenv"
import express from "express"
import cors from "cors"
import prisma from "../prisma/prismaClient.js"
import router from "./routes/router.js"

env.config()
const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use("/api", router)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))


process.on("SIGINT", () => {
    prisma.$disconnect();
    process.exit(0)
})