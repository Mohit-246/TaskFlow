import mongoose from "mongoose";
import User from "./user.js";

const taskSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: String, required: true },
  dueDate: { type: String, required: true, default: "medium" },
  isCompleted: { type: Boolean, required: true, default: false },
});

const Task = mongoose.model("task", taskSchema);

export default Task;
