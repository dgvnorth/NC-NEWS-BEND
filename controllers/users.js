const { fetchUserByUsername } = require("../models/users");

exports.sendUserByUsername = (req, res, next) => {
  const { username } = req.params;
  console.log(req.params);
  fetchUserByUsername(username).then(([user]) => {
    console.log("inside controller model func");
    res.status(200).send({ user });
  });
};
