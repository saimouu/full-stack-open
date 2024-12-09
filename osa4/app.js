const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");
const blogsRouter = require("./controllers/blogs");
const middleware = require("./utils/middleware")

mongoose
  .connect(config.MONGO_URI)
  .then((result) => {
    logger.info("Connected to mongodb");
  })
  .catch((error) => {
    logger.error("Error connencting to mongodb:", error.message);
  });

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger)

app.use("/api/blogs", blogsRouter);

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app;
