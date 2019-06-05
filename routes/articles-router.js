const express = require("express");
const articlesRouter = express.Router();
const {
  sendArticleByArticleId,
  patchArticleById
} = require("../controllers/articles");

articlesRouter
  .route("/:article_id")
  .get(sendArticleByArticleId)
  .patch(patchArticleById);

module.exports = articlesRouter;
