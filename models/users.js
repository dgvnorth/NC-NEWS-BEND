const connection = require("../db/connection");

exports.fetchUserByUsername = username => {
  return connection("users")
    .where({ username })
    .select("username", "avatar_url", "name")
    .from("users")
    .returning("*");
};
