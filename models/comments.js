const connection = require("../db/connection");

exports.createComment = (article_id, addedComment) => {
  return connection("comments")
    .insert({
      author: addedComment.username,
      article_id: article_id,
      body: addedComment.body
    })
    .returning("*");
};

exports.fetchComments = (
  article_id,
  { sort_by = "created_at", order = "desc" }
) => {
  return connection("comments")
    .where("article_id", article_id)
    .select(
      "comments.comment_id",
      "comments.votes",
      "comments.created_at",
      "comments.author",
      "comments.body"
    )
    .from("comments")
    .orderBy(sort_by, order);
};

exports.updateCommentVotes = (comment_id, increment = 0) => {
  return connection("comments")
    .where({ comment_id })
    .increment("votes", increment)
    .returning("*");
};

exports.removeComment = comment_id => {
  return connection("comments")
    .where({ comment_id })
    .del();
};
