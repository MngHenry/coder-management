const { AppError, sendResponse } = require("../helpers/utils");
const Task = require("../models/Task");
const mongoose = require("mongoose");

const taskController = {};
//create task
taskController.createTask = async (req, res, next) => {
  try {
    const { name, description, status } = req.body;
    if (!name || !description) throw new AppError(401, "Missing information");
    const taskCreated = await Task.create({ name, description, status });
    sendResponse(
      res,
      200,
      true,
      { task: taskCreated },
      null,
      "Create task completed successfully"
    );
  } catch (error) {
    next(error);
  }
};
// get all tasks
taskController.getTask = async (req, res, next) => {
  try {
    let { page, limit } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    //mongoose query
    const tasks = await Task.find()
      .populate("assignee")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    const sum = await Task.count();
    const total = await Task.countDocuments({ isDeleted: true });
    return sendResponse(
      res,
      200,
      true,
      {
        tasks: tasks,
        total: Math.ceil((sum - total) / limit),
        page: page,
      },
      null,
      "get list completed successfully"
    );
  } catch (error) {
    next(error);
  }
};

//get tasks of userId
taskController.getTaskOfUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const tasks = Task.find({ assignee: { _id: userId } });
    return sendResponse(
      res,
      200,
      true,
      {
        tasks: tasks,
      },
      null,
      "get list completed successfully"
    );
  } catch (error) {
    next(error);
  }
};

//update task
taskController.updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { assignee } = req.body;
    if (assignee) {
      if (!mongoose.isValidObjectId(assignee))
        throw new Error("Invalid userId");
    }
    if (!mongoose.isValidObjectId(id)) throw new Error("Invalid ID");
    const task = await Task.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true, runValidators: true }
    );
    if (!task) throw new AppError(401, "task not found", "task id not found");
    return sendResponse(
      res,
      200,
      true,
      { task: task },
      null,
      "update task completed successfully"
    );
  } catch (error) {
    next(error);
  }
};

//delete task
taskController.deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) throw new Error("Invalid ID");
    const task = await Task.findByIdAndUpdate(
      { _id: id },
      { isDeleted: true },
      { new: true, runValidators: true }
    );
    if (!task) throw new Error("task not found");
    return sendResponse(
      res,
      200,
      true,
      { task: task },
      null,
      "deleted task completed successfully"
    );
  } catch (error) {
    next(error);
  }
};
module.exports = taskController;
