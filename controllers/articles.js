const { fetchArticleByArticleId } = require("../models/articles");

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
