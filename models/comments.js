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
