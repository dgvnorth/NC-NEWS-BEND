const {
  topicsData,
  usersData,
  articlesData,
  commentsData
} = require("../data");
const {
  formatTimeStamps,
  createRef,
  formatBelongToComments,
  renameCommentsKeys
} = require("../../utils/index");

exports.seed = (knex, Promise) => {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return knex("topics")
        .insert(topicsData)
        .returning("*");
    })
    .then(() => {
      return knex("users")
        .insert(usersData)
        .returning("*");
    })
    .then(() => {
      const formattedArticlesData = formatTimeStamps(articlesData);
      return knex("articles")
        .insert(formattedArticlesData)
        .returning("*");
    })
    .then(articlesData => {
      const articlesRef = createRef(articlesData, "title", "article_id");
      const formattedBelongToKeyComments = formatBelongToComments(
        commentsData,
        articlesRef
      );
      const renamedCreatedByKeyComments = renameCommentsKeys(
        formattedBelongToKeyComments,
        "created_by",
        "author"
      );
      const formattedCreated_atComments = formatTimeStamps(
        renamedCreatedByKeyComments
      );
      return knex("comments")
        .insert(formattedCreated_atComments)
        .returning("*");
    });
};
