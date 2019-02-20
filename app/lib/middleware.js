export function useMiddleware(app) {
  const cors = require('cors');
  const bodyParser = require('body-parser');
  const security = require('./security.js');
  const securedRoutes = '/api/priv/';

  app.use(cors());
  configureBodyParser();
  configureErrorHandler();
  configureLog();
  security.useSecurity(app, securedRoutes);

  function configureBodyParser() {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
  }
  function configureLog() {
    app.use((req, res, next) => {
      logEveryRequest(req);
      next();
    });
  }
  function logEveryRequest(req) {
    const body = JSON.stringify(req.body);
    console.log(`${req.method} : ${req.url} - ${body}`);
  }
  function configureErrorHandler() {
    app.use((err, req, res, next) => {
      if (!err) next();
      console.error(err);
      res.status(err.status || 500).send({
        method: req.method,
        url: req.url,
        message: err.message,
      });
    });
  }
}
