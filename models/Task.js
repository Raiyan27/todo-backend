const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  taskId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  status: { type: String, required: true },
  description: { type: String },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Task", TaskSchema);
