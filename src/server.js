import env from "dotenv"
import express from "express"
import cors from "cors"
import prisma from "../prisma/prismaClient.js"
import router from "./routes/router.js"
import cookieParser from "cookie-parser"


env.config()
const app = express()
const PORT = process.env.PORT || 5000


app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true, 
}))
app.use(express.json())
app.use("/api", router)

async function checkConnectionDb() {
    try {
        await prisma.$connect();
        console.log('Database connected successfully!')
    } catch (error) {
        console.log("Database connection failed:", error)
        process.exit(1)
    }
}

checkConnectionDb()
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))


process.on("SIGINT", () => {
    prisma.$disconnect();
    process.exit(0)
})