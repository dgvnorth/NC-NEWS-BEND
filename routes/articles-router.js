const express = require("express");
const articlesRouter = express.Router();
const {
  sendArticleByArticleId,
  patchArticleById
} = require("../controllers/articles");
const { addCommentByArticleId } = require("../controllers/comments");

articlesRouter
  .route("/:article_id")
  .get(sendArticleByArticleId)
  .patch(patchArticleById);

articlesRouter.route("/:article_id/comments").post(addCommentByArticleId);

module.exports = articlesRouter;
