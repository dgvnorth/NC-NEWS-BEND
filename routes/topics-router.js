const express = require("express");
const topicsRouter = express.Router();
const { sendAllTopics } = require("../controllers/topics");

topicsRouter.route("/").get(sendAllTopics);

module.exports = topicsRouter;
