import express from "express";
import Task from "../model/task.js";

export const addTask = async (req, res) => {
  try {
    const { name, description, priority, dueDate, isCompleted } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "Add The details as Required",
      });
    }

    const newtask = new Task({
      name,
      description,
      priority: priority || "Low",
      dueDate: dueDate || null,
      isCompleted: isCompleted || false,
      author: req.userId,
    });

    await newtask.save();

    res.status(201).json({
      success: true,
      message: "Task Added Successfully",
      task: newtask,
    });
  } catch (error) {
    console.error("❌ Error in addTask:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getTask = async (req, res) => {
  try {
    const userId = req.user_Id;
    const tasks = await Task.find({ author: userId }).sort({ createdAt: -1 });
    if (!tasks || tasks.length === 0) {
      return res.status(201).json({
        success: false,
        message: "No task Available",
        count: 0,
        task: [],
      });
    }

    return res.status(201).json({
      success: true,
      message: "Tasks Found",
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const updateTaskComplete = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(404)
        .json({ success: false, message: "Task Id is Required" });
    }
    const task = await Task.findById(id);
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task Not Found" });
    }

    task.isCompleted = !task.isCompleted;
    await task.save();
    return res
      .status(201)
      .json({ success: true, message: "Task Updated Successfully", task });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const editTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(404)
        .json({ success: false, message: "Task Id is Required" });
    }
    const { name, description, priority, dueDate } = req.body;
    const task = await Task.findByIdAndUpdate(
      id,
      {
        name,
        description,
        priority,
        dueDate,
      },
      { new: true }
    );
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task Not Found" });
    }
    return res.status(201).json({
      success: true,
      messege: "Task Updated Successfully",
      task,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(404)
        .json({ success: false, message: "Task Id is Required" });
    }

    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ success: true, message: "Task Not Found" });
    }
    return res
      .status(201)
      .json({ success: true, message: "Task Deleted Successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
