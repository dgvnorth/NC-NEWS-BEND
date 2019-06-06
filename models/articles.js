const connection = require("../db/connection");

exports.fetchArticleByArticleId = article_id => {
  return connection("articles")
    .where("articles.article_id", article_id)
    .select(
      //'articles.*'
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
    .leftJoin("comments", "comments.article_id", "=", "articles.article_id")
    .groupBy("articles.article_id")
    .returning("*");
};

exports.updateArticleVotes = (article_id, increment) => {
  return connection("articles")
    .where({ article_id })
    .increment("votes", increment)
    .returning("*");
};

exports.fetchAllArticles = (
  { author, topic },
  sort_by = "created_at",
  order = "desc"
) => {
  return connection("articles")
    .select("articles.*")
    .from("articles")
    .orderBy(sort_by, order)
    .modify(query => {
      if (author) query.where("author", author);
      else if (topic) query.where("topic", topic);
    })
    .then(articles => {
      return articles;
    });
};
