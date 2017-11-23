module.exports.useMiddleware = function(app) {
  const cors = require("cors");
  const bodyParser = require("body-parser");
  const security = require("./security.js");
  const securedRoutes = "/api/priv/";

  app.use(cors());

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use((req, res, next) => {
    logEveryRequest(req);
    next();
  });
  function logEveryRequest(req) {
    const body = JSON.stringify(req.body);
    console.log(`${req.method} : ${req.url} - ${body}`);
  }

  security.useSecurity(app, securedRoutes);
};
