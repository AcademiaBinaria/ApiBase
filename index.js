const PORT = process.env.PORT || 80;
const express = require("express");
const helmet = require("helmet");
const app = express();

app.use(helmet());

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
