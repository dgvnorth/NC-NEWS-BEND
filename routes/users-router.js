const express = require("express");
const usersRouter = express.Router();
const { sendUserByUsername } = require("../controllers/users");
const { methodNotAllowed } = require("../errors/index");

usersRouter
  .route("/:username")
  .get(sendUserByUsername)
  .all(methodNotAllowed);

module.exports = usersRouter;
