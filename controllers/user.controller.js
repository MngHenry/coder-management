const { AppError, sendResponse } = require("../helpers/utils");
const mongoose = require("mongoose");
const User = require("../models/User");

const userController = {};
//create user
userController.createUser = async (req, res, next) => {
  try {
    const { name, role } = req.body;
    if (!name || !role) throw new AppError(401, "Missing information");
    const userCreated = await User.create({ name, role });
    sendResponse(
      res,
      200,
      true,
      { user: userCreated },
      null,
      "Create user completed successfully"
    );
  } catch (error) {
    next(error);
  }
};
// get all users
userController.getUser = async (req, res, next) => {
  try {
    let { page, limit } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 50;
    //mongoose query
    const users = await User.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    const sum = await User.count();
    const total = await User.countDocuments({ isDeleted: true });
    return sendResponse(
      res,
      200,
      true,
      {
        users: users,
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
//update user role
userController.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) throw new Error("Invalid ID");

    const user = await User.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true, runValidators: true }
    );
    if (!user) throw new AppError(401, "user not found", "user id not found");
    return sendResponse(
      res,
      200,
      true,
      { user: user },
      null,
      "update user completed successfully"
    );
  } catch (error) {
    next(error);
  }
};
//delete user
userController.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) throw new Error("Invalid ID");
    const user = await User.findByIdAndUpdate(
      { _id: id },
      { isDeleted: true },
      { new: true, runValidators: true }
    );
    if (!user) throw new Error("user not found");
    return sendResponse(
      res,
      200,
      true,
      { user: user },
      null,
      "deleted user completed successfully"
    );
  } catch (error) {
    next(error);
  }
};
module.exports = userController;
