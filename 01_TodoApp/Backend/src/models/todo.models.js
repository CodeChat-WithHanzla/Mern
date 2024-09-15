import { Schema, model } from "mongoose";
const todoSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
export const Todo = model("Todo", todoSchema);
