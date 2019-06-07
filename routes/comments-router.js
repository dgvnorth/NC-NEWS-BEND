const express = require("express");
const commentsRouter = express.Router();
const {
  patchCommentById,
  deleteCommentById
} = require("../controllers/comments");
const { methodNotAllowed } = require("../errors/index");

commentsRouter
  .route("/:comment_id")
  .patch(patchCommentById)
  .delete(deleteCommentById)
  .all(methodNotAllowed);

module.exports = commentsRouter;
