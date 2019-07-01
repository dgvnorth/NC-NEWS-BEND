const {
  createComment,
  fetchComments,
  updateCommentVotes,
  removeComment
} = require("../models/comments");
const { fetchArticleByArticleId } = require("../models/articles");

exports.addCommentByArticleId = (req, res, next) => {
  const comment = req.body;
  const { article_id } = req.params;
  fetchArticleByArticleId(article_id)
    .then(article => {
      if (article.length === 0) {
        return Promise.reject({ status: 404, message: "article not found" });
      } else return createComment(article_id, comment);
    })
    .then(([addedComment]) => {
      if (!addedComment.body)
        return Promise.reject({ status: 404, message: "comment not found" });
      res.status(201).send({ comment: addedComment });
    })
    .catch(next);
};

exports.sendCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticleByArticleId(article_id)
    .then(article => {
      if (article.length === 0)
        return Promise.reject({ status: 404, message: "article not found" });
      else return fetchComments(article_id, req.query);
    })
    .then(comments => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.patchCommentById = (req, res, next) => {
  const increment = req.body.inc_votes;
  const { comment_id } = req.params;
  updateCommentVotes(comment_id, increment)
    .then(([comment]) => {
      if (!comment)
        return Promise.reject({ status: 404, message: "comment not found" });
      res.status(200).send({ comment });
    })
    .catch(next);
};

exports.deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  removeComment(comment_id)
    .then(delCount => {
      if (delCount) res.sendStatus(204);
      else if (!delCount) {
        return Promise.reject({ status: 404, msg: "comment not found" });
      }
    })
    .catch(next);
};
