const mongoose = require("mongoose");
const taskSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    assignee: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: ["Pending", "Working", "Review", "Done", "Archive"],
      default: "Pending",
      required: true,
    },
    isDeleted: { type: Boolean, default: false, required: true },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
