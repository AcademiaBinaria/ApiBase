const PORT = process.env.PORT || 3030;
const express = require("express");
const helmet = require("helmet");
const app = express();

app.use(helmet());

process.on("uncaughtException", err => {
  logger.warn("uncaughtException");
  logger.error(err);
  process.exit(1);
});

configureMiddleware(app);
configureApi(app);

app.listen(PORT);
console.log(`listening on port ${PORT}`);

function configureMiddleware(app) {
  const middleware = require("./app/lib/middleware");
  middleware.useMiddleware(app);
}

function configureApi(app) {
  require("./app/global/api.routing")(app);
}
