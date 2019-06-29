exports.routeNotFound = (req, res) => {
  res.status(404).send({ msg: "Route Not Found" });
};

exports.methodNotAllowed = (req, res) => {
  res.status(405).send({ msg: "Method Not Allowed" });
};

exports.handlePsqlErrors = (err, req, res, next) => {
  const psqlErrorCodes = ["23502", "23503", "42703", "22P02", "22003"];
  if (psqlErrorCodes.includes(err.code))
    res.status(400).send({ message: `400:${err.message.split("-")[1]}` });
  else next(err);
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status === 404) res.status(404).send(err);
  else next(err);
};

exports.handleServerErrors = (err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
};
