const express = require("express");
const cors = require("cors");
const apiRouter = require("./routes/api");
const {
  routeNotFound,
  handleServerErrors,
  handlePsqlErrors,
  handleCustomErrors
} = require("./errors");
const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", apiRouter);

app.all("/*", routeNotFound);

app.use(handlePsqlErrors);

app.use(handleCustomErrors);

app.use(handleServerErrors);

module.exports = app;
