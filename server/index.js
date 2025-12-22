import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { staffRouter } from "./route/staff.route.js";
import { authRouter } from "./route/auth.route.js";
import { userRouter } from "./route/user.route.js";

dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/staff", staffRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const port = 3005;
    process.env.PORT;
    app.listen(process.env.PORT, () => {
      console.log(`server running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
