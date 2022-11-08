const express = require("express");
const {
  getTask,
  createTask,
  updateTask,
  deleteTask,
  addReference,
  getTaskOfUserId,
} = require("../controllers/task.controller");
const router = express.Router();

router.get("/", getTask);

router.get("/:id", getTaskOfUserId);

router.post("/", createTask);

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);
module.exports = router;
