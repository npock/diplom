import { Router } from "express";
import { Staff } from "../model/staff.model.js";
import { isAuth } from "../middleweare/isAuth.js";

export const staffRouter = Router();

staffRouter.get("/", async (req, res) => {
  try {
    const staffs = await Staff.find();
    res.status(200).json({ staffs, message: "all staffs" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

staffRouter.post("/", async (req, res) => {
  try {
    const staff = await Staff.create(req.body);
    res.status(200).json({ staff, message: " staff created " });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

staffRouter.get("/:id", isAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const staff = await Staff.findById(id);
    res.status(200).json({ staff, message: "staff by id" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

staffRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Staff.findByIdAndDelete(id);
    res.status(200).json({ message: "staff deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

staffRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedStaff = await Staff.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).json({ updatedStaff, message: "staff updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});
