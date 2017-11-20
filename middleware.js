/**
 * @param {object} app - express app instance
 * @param {object} express - express framework
 * @return configured app
 */
module.exports.useMiddleware = app => {
  const cors = require("cors");
  const bodyParser = require("body-parser");
  const security = require("./security/security.js");
  const securedRoutes = "/api/priv/";

  app.use(cors());

  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
  app.use(bodyParser.json());

  app.use((req, res, next) => {
    console.log(`req : ${req.method} - ${req.url}`);
    next();
  });

  security.useSecurity(app, securedRoutes);
};
