require("dotenv").config();
const cors = require("cors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");

const { AppsSharp } = require("@mui/icons-material");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

const mongoose = require("mongoose");
const { sendResponse } = require("./helpers/utils");
const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI)
  .then(() => console.log(`DB connected ${mongoURI}`))
  .catch((err) => console.log(err));
app.use("/", indexRouter);

app.use((req, res, next) => {
  const err = new Error(404, "Not Found", "Bad Request");
  next(err);
});

app.use((err, req, res, next) => {
  console.log("ERROR", err);
  return sendResponse(
    res,
    err.statusCode ? err.statusCode : 500,
    false,
    null,
    { message: err.message },
    err.isOperational ? err.errorType : "Internal Server Error"
  );
});
module.exports = app;
