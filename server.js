require("dotenv").config();

const express = require("express");
const cors = require("cors");
const prisma = require("./prisma/prismaClient.js");
const router = require("./src/routes/router.js");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL_DEV,
    credentials: true,
  })
);
app.use(express.json());
app.use("/api", router);

async function checkConnectionDb() {
  try {
    await prisma.$connect();
    console.log("Database connected successfully!");
  } catch (error) {
    console.log("Database connection failed:", error);
    process.exit(1);
  }
}

checkConnectionDb();
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

process.on("SIGINT", () => {
  prisma.$disconnect();
  process.exit(0);
});
