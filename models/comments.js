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
  { sort_by = "article_id", order = "desc" }
) => {
  return connection("comments")
    .where("article_id", article_id)
    .select("comments.*")
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
