const packageJSON = require("./package.json");

module.exports = (app, url) => {
  // api/pub/admin
  app.route(url).get((req, res) => {
    const processInfo = {
      message: "test",
      version: packageJSON.version,
      env: {
        dyno: process.env.DYNO,
        path: process.env.PATH,
        port: process.env.PORT
      },
      platform: process.platform,
      arch: process.arch
    };
    res.json(processInfo);
  });
  app.route(`${url}/error`).get((req, res) => {
    res.json(notDefinded);
  });
};
