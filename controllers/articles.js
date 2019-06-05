const {
  fetchArticleByArticleId,
  updateArticleVotes
} = require("../models/articles");

exports.sendArticleByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticleByArticleId(article_id)
    .then(([article]) => {
      if (!article) {
        return Promise.reject({ status: 404, message: "username not found" });
      }
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.patchArticleById = (req, res, next) => {
  console.log("inside patching article");
  const increment = req.body.inc_votes;
  const { article_id } = req.params;
  updateArticleVotes(article_id, increment)
    .then(([article]) => {
      if (!article)
        return Promise.reject({ status: 404, message: "article_id not found" });
      res.status(200).send({ article });
    })
    .catch(next);
};
