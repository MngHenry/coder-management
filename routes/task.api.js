const express = require("express");
const {
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTaskById,
} = require("../controllers/task.controller");
const router = express.Router();
/**
 * @route GET api/tasks
 * @description get list of tasks
 * @access public  */
router.get("/", getTask);

/**
 * @route GET api/tasks/:id
 * @description get task by id
 * @access public  */
router.get("/:id", getTaskById);

/**
 * @route POST api/tasks
 * @description create new task
 * @access public  */
router.post("/", createTask);
/**
 * @route PUT api/tasks/:id
 * @description update task (add assignee, control status "Done" - cannot change to "archive" status)
 * @access public  */
router.put("/:id", updateTask);
/**
 * @route DELETE api/tasks/:id
 * @description delete task - set isDeleted: true ( soft delete)
 * @access public  */
router.delete("/:id", deleteTask);

module.exports = router;
