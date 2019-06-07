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
const { methodNotAllowed } = require("../errors/index");

articlesRouter
  .route("/")
  .get(sendAllArticles)
  .all(methodNotAllowed);

articlesRouter
  .route("/:article_id")
  .get(sendArticleByArticleId)
  .patch(patchArticleById)
  .all(methodNotAllowed);

articlesRouter
  .route("/:article_id/comments")
  .post(addCommentByArticleId)
  .get(sendCommentsByArticleId)
  .all(methodNotAllowed);

module.exports = articlesRouter;
