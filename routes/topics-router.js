const express = require("express");
const topicsRouter = express.Router();
const { sendAllTopics } = require("../controllers/topics");
const { methodNotAllowed } = require("../errors/index");

topicsRouter
  .route("/")
  .get(sendAllTopics)
  .all(methodNotAllowed);

module.exports = topicsRouter;
