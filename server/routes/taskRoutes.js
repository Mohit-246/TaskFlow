import express from "express";
import {
  addTask,
  getTask,
  updateTaskComplete,
  editTask,
  deleteTask,
} from "../controllers/taskControllers.js";
import { protect } from "../middleware/Authmiddleware.js";

const router = express.Router();

router.post("/add", protect, addTask);
router.get("/getall", protect, getTask);
router.put("/completed/:id", protect, updateTaskComplete);
router.put("/edit/:id", protect, editTask);
router.delete("/delete/:id", protect, deleteTask);

export default router;
