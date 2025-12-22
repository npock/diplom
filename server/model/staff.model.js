import mongoose from "mongoose";
const staffSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: { type: String },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    data: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);
export const Staff = mongoose.model("Staff", staffSchema);
