const apiRouter = require("express").Router();
const { methodNotAllowed } = require("../errors");
const topicsRouter = require("../routes/topics-router");
const usersRouter = require("../routes/users-router");

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", usersRouter);

apiRouter
  .route("/")
  .get((req, res) => res.send({ ok: true }))
  .all(methodNotAllowed);

module.exports = apiRouter;
