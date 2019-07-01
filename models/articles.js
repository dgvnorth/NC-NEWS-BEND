const connection = require("../db/connection");

exports.fetchArticleByArticleId = article_id => {
  return connection("articles")
    .where("articles.article_id", article_id)
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
    .leftJoin("comments", "comments.article_id", "=", "articles.article_id")
    .groupBy("articles.article_id")
    .returning("*");
};

exports.updateArticleVotes = (article_id, increment = 0) => {
  return connection("articles")
    .where({ article_id })
    .increment("votes", increment)
    .returning("*");
};

exports.fetchAllArticles = ({
  author,
  topic,
  sort_by = "created_at",
  order = "desc",
  search = ""
}) => {
  return connection("articles")
    .select("articles.*")
    .count("comment_id as comment_count")
    .from("articles")
    .leftJoin("comments", "comments.article_id", "=", "articles.article_id")
    .groupBy("articles.article_id")
    .orderBy(sort_by, order)
    .modify(query => {
      if (author) query.where("articles.author", author);
      else if (topic) query.where("topic", topic);
      else if (search)
        query
          .where("title", "like", `%${search}%`)
          .orWhere("articles.body", "like", `%${search}%`)
          .orWhere("articles.author", "like", `%${search}%`);
      // .orWhere("articles.created_at", "like", `%${search}%`);
      console.log(search);
    })
    .then(articles => {
      console.log(articles);

      return articles;
    });
};
