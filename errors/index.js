exports.routeNotFound = (req, res) => {
  // console.log("inside 404");
  res.status(404).send({ msg: "Route Not Found" });
};

exports.methodNotAllowed = (req, res) => {
  // console.log("inside 405");
  res.status(405).send({ msg: "Method Not Allowed" });
};

exports.handlePsqlErrors = (err, req, res, next) => {
  // console.log("inside 400", err);
  const psqlErrorCodes = ["23502", "23503", "42703", "22P02", "22003"];
  if (psqlErrorCodes.includes(err.code))
    res.status(400).send({ message: err.message.split("-")[1] });
  else next(err);
};

exports.handleCustomErrors = (err, req, res, next) => {
  // console.log("404", err);
  if (err.status === 404) res.status(404).send(err);
  else next(err);
};

exports.handleServerErrors = (err, req, res, next) => {
  // console.log("inside 500");
  res.status(500).send({ msg: "Internal Server Error" });
};
