const connection = require("../db/connection");

exports.fetchUserByUsername = username => {
  console.log("inside users model");
  return connection("users")
    .where({ username })
    .select("username", "avatar_url", "name")
    .from("users")
    .returning("*");
};
