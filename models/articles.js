const connection = require("../db/connection");

exports.fetchArticleByArticleId = article_id => {
  return connection("articles")
    .where({ article_id })
    .select(
      "author",
      "title",
      "article_id",
      "body",
      "topic",
      "created_at",
      "votes"
    )
    .then(([article]) => {
      return connection("articles")
        .select(
          "articles.article_id",
          "articles.author",
          "articles.body",
          "title",
          "articles.created_at",
          "topic",
          "articles.votes"
        )
        .count("comment_id as comment_count")
        .from("articles")
        .innerJoin(
          "comments",
          "comments.article_id",
          "=",
          "articles.article_id"
        )
        .groupBy("articles.article_id")
        .returning("*");
    });
};
