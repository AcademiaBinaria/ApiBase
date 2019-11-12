const packageJSON = require("../../package.json");

module.exports = (app, url) => {
  // api/pub/hello
  app.route(url).get((req, res) => {
    const processInfo = {
      message: "Hola Academia Binaria",
      version: packageJSON.version,
      useragent: req.get("User-Agent"),
      address: req.header("x-forwarded-for") || req.connection.remoteAddress
    };
    console.log("process:", processInfo);
    res.json(processInfo);
  });
  app.route(`${url}/error`).get((req, res) => {
    res.json(notDefinded);
  });
};
