const express = require("express");
const articlesRouter = express.Router();
const {
  sendArticleByArticleId,
  patchArticleById,
  sendAllArticles
} = require("../controllers/articles");
const {
  addCommentByArticleId,
  sendCommentsByArticleId
} = require("../controllers/comments");

articlesRouter.route("/").get(sendAllArticles);

articlesRouter
  .route("/:article_id")
  .get(sendArticleByArticleId)
  .patch(patchArticleById);

articlesRouter
  .route("/:article_id/comments")
  .post(addCommentByArticleId)
  .get(sendCommentsByArticleId);

module.exports = articlesRouter;
