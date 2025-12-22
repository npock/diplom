import { Router } from "express";
import { User } from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { isAuth } from "../middleweare/isAuth.js";

export const authRouter = Router();

authRouter.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "user already exists" });
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.cookie("token", token, { httpOnly: true });

    const { password: _, ...userData } = user.toObject();
    res.status(201).json({ userData, message: "user created" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "user does not exist" });
    }
    const isMatch = await bcryptjs.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "авторизация не пройдена" });
    }
    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET
    );
    res.cookie("token", token, { httpOnly: true });

    const { password: _, ...userData } = existingUser.toObject();
    res.status(201).json({ userData, message: "user logged in" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

authRouter.post("/logout", async (req, res) => {
  try {
    res.clearCookie("token", { httpOnly: true });
    res.status(200).json({ message: "user logged out" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

authRouter.get("/me", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "unathorized" });
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.userId);
    const { password: _p, ...userData } = user.toObject();
    res.status(201).json({ userData, message: "user logged in" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

authRouter.patch("/:id", isAuth, async (req, res) => {
  try {
    const { id } = req.params;

    const updates = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updates },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }
    const { password: _p, ...userData } = updatedUser.toObject();

    res.status(200).json({ userData, message: "user updated!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Ошибка при обновлении пользователя",
      error: error.message,
    });
  }
});
