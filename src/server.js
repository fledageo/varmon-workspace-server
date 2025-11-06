import env from "dotenv"
import express from "express"
import cors from "cors"
import prisma from "../prisma/prismaClient.js"
import router from "./routes/router.js"
import cookieParser from "cookie-parser"


env.config()
const app = express()
const PORT = parseInt(process.env.PORT) || 5000;

const allowedOrigins = process.env.FRONTEND_URLS
  ? process.env.FRONTEND_URLS.split(",")
  : [process.env.FRONTEND_URL];

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); 
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn(`CORS blocked for origin: ${origin}`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
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