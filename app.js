const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const routes = require("./routes");
const ApiError = require('./common/ApiError');
const errorMessages = require('./common/constants/errorMessages');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// routes
app.use("/api", routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(new ApiError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.log(err)
  if (err instanceof ApiError && err.isOperational) {
    res.status(err.status).json({
      error: {
        message: err.message,
        code: err.status,
      }
    });
  } else {
    res.status(500).json({
      error: {
        code: 500,
        message: errorMessages[500]
      }
    });
  }
});

module.exports = app;
