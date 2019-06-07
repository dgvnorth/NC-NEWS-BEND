const { fetchAllTopics } = require("../models/topics");

exports.sendAllTopics = (req, res, next) => {
  console.log("inside controller");
  fetchAllTopics(req.query)
    .then(topics => {
      res.status(200).send({ topics });
    })
    .catch(next);
};
