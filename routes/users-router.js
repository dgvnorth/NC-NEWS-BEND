const express = require("express");
const usersRouter = express.Router();
const { sendUserByUsername } = require("../controllers/users");

usersRouter.route("/:username").get(sendUserByUsername);

module.exports = usersRouter;
