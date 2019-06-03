const {
  topicsData,
  usersData,
  articlesData,
  commentsData
} = require("../data");

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
    .then(topicsData => {
      const houseRef = createRef(houseRows, "house_name", "house_id");
      const formattedWizards = formatWizards(wizardData, houseRef);
      return knex("wizards")
        .insert(formattedWizards)
        .returning("*");
    })
    .then(usersData => {
      console.log(usersData); // to see the tables
    });
};
