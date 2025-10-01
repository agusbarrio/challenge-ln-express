const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const routes = require("./routes");
const ApiError = require('./common/ApiError');
const errorMessages = require('./common/constants/errorMessages');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require("swagger-ui-express");

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

if (process.env.ENABLE_SWAGGER_DOCUMENTATION === 'true') {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Challenge LN",
        version: "1.0.0",
        description: "Catálogo de productos",
      },
      servers: [
        {
          url: "/api",
        },
      ],
    },
    apis: ["./routes/*.js"],
  };

  const swaggerSpec = swaggerJSDoc(options);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && "body" in err) {
    throw new ApiError(400, "Invalid JSON")
  }
  next(err);
});

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
    const customError = {
      message: err.message,
      code: err.status,
    }
    if (err.description) customError.description = err.description
    res.status(err.status).json(customError);
  } else {
    res.status(500).json({
      code: 500,
      message: errorMessages[500]
    });
  }
});

module.exports = app;
