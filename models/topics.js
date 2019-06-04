const connection = require("../db/connection");

exports.fetchAllTopics = () => {
  console.log("inside topics model");
  return connection
    .select("slug", "description")
    .from("topics")
    .returning("*");
};
