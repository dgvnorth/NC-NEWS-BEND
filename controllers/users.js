const { fetchUserByUsername } = require("../models/users");

exports.sendUserByUsername = (req, res, next) => {
  const { username } = req.params;
  fetchUserByUsername(username)
    .then(([user]) => {
      if (!user) {
        return Promise.reject({ status: 404, message: "username not found" });
      }
      res.status(200).send({ user });
    })
    .catch(next);
};
