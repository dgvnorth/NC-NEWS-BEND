const {
  topicsData,
  usersData,
  articlesData,
  commentsData
} = require("../data");
const { formatTimeStamps } = require("../../utils/index");

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
      console.log(formattedArticlesData);
      return knex("articles")
        .insert(formattedArticlesData)
        .returning("*");
    })
    .then(articlesData => {
      console.log(articlesData); // to see the tables
    });
};
