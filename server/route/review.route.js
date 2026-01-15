import { Router } from "express";
import { isAuth } from "../middleweare/isAuth.js";
import { Review } from "../model/review.model.js";

export const reviewRouter = Router({ mergeParams: true });

reviewRouter.post("/", isAuth, async (req, res) => {
  try {
    const { reviewData, stuffId } = req.body;
    const newReview = await Review.create({
      text: reviewData.text,
      rating: reviewData.rating,
      author: req.user._id, // Из isAuth
      stuffId: stuffId,
    });

    const populatedReview = await newReview.populate("author", "name");

    res.status(201).json({ data: populatedReview, message: "review added" });
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
});
reviewRouter.post("/filter", async (req, res) => {
  try {
    const { stuffId } = req.body; // Извлекаем stuffId из тела запроса

    if (!stuffId) {
      return res.status(400).json({ message: "stuffId обязателен" });
    }

    const reviews = await Review.find({ stuffId: stuffId })
      .populate("author", "name")
      .sort({ createdAt: -1 }); // Новые сверху

    res.json({ data: reviews, message: "filtered reviews" });
  } catch (error) {
    res.status(500).json({ message: "Ошибка получения отзывов" });
  }
});

reviewRouter.delete("/:reviewId", isAuth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);
    if (!review) return res.status(404).json({ message: "Отзыв не найден" });

    if (
      review.author.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Нет прав на удаление" });
    }

    await Review.findByIdAndDelete(req.params.reviewId);
    res.json({ message: "Отзыв удален" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

reviewRouter.patch("/:reviewId", isAuth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);
    if (review.author.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Можно редактировать только свой отзыв" });
    }

    const updatedReview = await Review.findByIdAndUpdate(
      req.params.reviewId,
      { text: req.body.text, rating: req.body.rating },
      { new: true }
    ).populate("author", "name");

    res.json({ data: updatedReview, message: "was updated" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

reviewRouter.get("/my-reviews", isAuth, async (req, res) => {
  try {
    const reviews = await Review.find({ author: req.user._id })
      .populate("stuffId", "name")
      .sort({ createdAt: -1 });

    res.json({ data: reviews, message: "ваши отзывы" });
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
});
