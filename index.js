const express = require("express");
const app = express();
const port = 3030;

configureMiddleware(app);
configureApi(app);

app.listen(port);
console.log(`listening on port ${port}`);

function configureMiddleware(app) {
  const middleware = require("./app/lib/middleware");
  middleware.useMiddleware(app);
}

function configureApi(app) {
  require("./app/global/api.routing")(app);
}
