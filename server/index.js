import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Импорт роутов
import { stuffRouter } from "./route/stuff.route.js";
import { authRouter } from "./route/auth.route.js";
import { userRouter } from "./route/user.route.js";
import { reviewRouter } from "./route/review.route.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();
const app = express();

// Настройки
app.use(
  cors({
    origin: [process.env.CLIENT_URL, "http://localhost:5173"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

// Раздача фронтенда (папка dist после npm run build)
app.use(express.static(join(__dirname, "dist")));

// API роуты
app.use("/api/v1/stuff", stuffRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/reviews", reviewRouter);

// Обработка SPA-роутинга (обязательно после API)
app.get("*any", (req, res) => {
  res.sendFile(join(__dirname, "dist", "index.html"));
});

const start = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI;
    const PORT = process.env.PORT || 3005;
    console.log("Моя ссылка на базу:", process.env.MONGO_URI);

    await mongoose.connect(MONGO_URI);
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Startup error:", error);
  }
};

start();
