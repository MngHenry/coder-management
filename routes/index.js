var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.status(200).send("welcome to coder management!");
});

const taskRouter = require("./task.api.js");
router.use("/tasks", taskRouter);

const userRouter = require("./user.api.js");
router.use("/users", userRouter);
module.exports = router;
