const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    role: {
      type: String,
      enum: ["Manager", "Employee"],
      default: "Employee",
      required: true,
    },
    isDeleted: { type: Boolean, default: false, required: true },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
userSchema.virtual("tasksList", {
  ref: "Task",
  localField: "_id",
  foreignField: "assignee",
  justOne: false,
});
const User = mongoose.model("User", userSchema);
module.exports = User;
