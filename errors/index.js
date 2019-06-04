exports.routeNotFound = (req, res) => {
  console.log("inside 404");
  res.status(404).send({ msg: "Route Not Found" });
};

exports.methodNotAllowed = (req, res) => {
  console.log("inside 405");
  res.status(405).send({ msg: "Method Not Allowed" });
};

exports.badRequest = (err, req, res, next) => {
  console.log("inside 400", err);
  res.status(400).send({ msg: "Bad Request" });
};

exports.handle500 = (err, req, res, next) => {
  console.log("inside 500");
  res.status(500).send({ msg: "Internal Server Error" });
};
