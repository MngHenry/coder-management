const express = require("express");
const {
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getTaskOfUserId,
} = require("../controllers/user.controller");

const router = express.Router();

/**
 * @route GET api/users
 * @description get list of users
 * @access public  */

router.get("/", getUser);

/**
 * @route GET api/users/:id
 * @description get tasklist of user
 * @access public  */
router.get("/:id", getTaskOfUserId);

/**
 * @route POST api/users/
 * @description create new user
 * @access public  */
router.post("/", createUser);

/**
 * @route PUT api/users/:id
 * @description update profile of user
 * @access public  */
router.put("/:id", updateUser);

/**
 * @route DELETE api/users/:id
 * @description delete profile of user (soft delete)
 * @access public  */
router.delete("/:id", deleteUser);

module.exports = router;
