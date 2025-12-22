import { Router } from "express";
import { isAuth } from "../middleweare/isAuth.js";
import { checkRole } from "../middleweare/checkRole.js";
import { User } from "../model/user.model.js";

export const userRouter = Router();

userRouter.get("/users", isAuth, checkRole("admin"), async (req, res) => {
  try {
    const userData = await User.find();

    res.status(201).json({ userData, message: "users finded" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

userRouter.delete("/:id", isAuth, checkRole("admin"), async (req, res) => {
  try {
    const { id } = req.params;

    if (id === req.user._id.toString()) {
      return res
        .status(400)
        .json({ message: "Вы не можете удалить самого себя" });
    }
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "user deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

userRouter.patch("/:id", isAuth, checkRole("admin"), async (req, res) => {
  try {
    const { id } = req.params;
    if (id === req.user._id.toString()) {
      return res.status(400).json({ message: "Вы не можете обновить себя" });
    }
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

    res.status(200).json({ userData: updatedUser, message: "user updated!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Ошибка при обновлении пользователя",
      error: error.message,
    });
  }
});
