import { Router } from "express";
import { Stuff } from "../model/stuff.model.js";
import { isAuth } from "../middleweare/isAuth.js";
import { checkRole } from "../middleweare/checkRole.js";
import { reviewRouter } from "./review.route.js";

export const stuffRouter = Router();

// stuffRouter.get("/", async (req, res) => {
//   try {
//     const stuff = await Stuff.find();
//     res.status(200).json({ data: stuff, message: "all stuff" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: error.message });
//   }
// });

stuffRouter.get("/", async (req, res) => {
  try {
    const { search, sort, page = 1, limit = 8 } = req.query;

    const query = search ? { name: { $regex: search, $options: "i" } } : {};

    let sortOptions = { createdAt: -1 };
    if (sort === "price_asc") sortOptions = { price: 1 };
    if (sort === "price_desc") sortOptions = { price: -1 };

    const skip = (page - 1) * limit;

    const total = await Stuff.countDocuments(query);
    const stuff = await Stuff.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit));

    res.json({
      data: {
        stuff,
        totalPages: Math.ceil(total / limit),
        currentPage: Number(page),
      },
      message: "all stuff",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

stuffRouter.post(
  "/",
  isAuth,
  checkRole("admin", "moderator"),
  async (req, res) => {
    try {
      const newStuff = await Stuff.create({
        ...req.body,
        author: req.user._id,
      });
      res.status(201).json({ data: newStuff, message: "stuff created" });
    } catch (error) {
      if (error.name === "ValidationError") {
        res.status(400).json({ message: "Заполните все обязательные поля" });
      }
      res.status(500).json({ message: "Ошибка при создании товара" });
    }
  }
);

stuffRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const stuff = await Stuff.findById(id);
    res.status(200).json({ data: stuff, message: "stuff by id" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

stuffRouter.delete(
  "/:id",
  isAuth,
  checkRole("admin", "moderator"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const stuff = await Stuff.findById(id);

      if (!stuff) {
        return res.status(404).json({ message: "Товар не найден" });
      }
      if (
        req.user.role !== "admin" &&
        stuff.author.toString() !== req.user._id.toString()
      ) {
        return res
          .status(403)
          .json({ message: "Вы можете удалять только свои товары" });
      }

      await Stuff.findByIdAndDelete(id);
      res.status(200).json({ message: "Товар удален" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }
);

stuffRouter.patch(
  "/:id",
  isAuth,
  checkRole("admin", "moderator"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      const stuff = await Stuff.findById(id);
      if (!stuff) {
        return res.status(404).json({ message: "Товар не найден" });
      }
      if (
        req.user.role !== "admin" &&
        stuff.author.toString() !== req.user._id.toString()
      ) {
        return res
          .status(403)
          .json({ message: "Вы можете редактировать только свои товары" });
      }

      const updatedStaff = await Stuff.findByIdAndUpdate(
        id,
        { $set: updates },
        {
          new: true,
          runValidators: true,
        }
      );

      res.status(200).json({ data: updatedStaff, message: "stuff updated" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }
);

stuffRouter.use("/:id/reviews", reviewRouter);
