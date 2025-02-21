const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

router.post("/tasks", async (req, res) => {
  try {
    const { userEmail, taskId, title, description } = req.body;

    const newTask = new Task({
      userEmail,
      taskId,
      title,
      description,
      status: "TODO",
    });

    await newTask.save();
    res
      .status(201)
      .json({ message: "Task created successfully", task: newTask });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/tasks", async (req, res) => {
  try {
    const { userEmail } = req.query;

    if (!userEmail) {
      return res.status(400).json({ message: "User email is required" });
    }

    const tasks = await Task.find({ userEmail });

    res.status(200).json({ message: "Tasks fetched successfully", tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/tasks/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description, status } = req.body;

    const updatedTask = await Task.findOneAndUpdate(
      { taskId },
      { title, description, status },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res
      .status(200)
      .json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/tasks/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;

    const deletedTask = await Task.findOneAndDelete({ taskId });

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
