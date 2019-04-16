const packageJSON = require('../../package.json');

module.exports = (app, url) => {
  // api/pub/admin
  app.route(url).get((req, res) => {
    const processInfo = {
      message: 'Hola Academia Binaria',
      version: packageJSON.version,
      env: {
        dyno: process.env.DYNO,
        port: process.env.PORT,
      },
      platform: process.platform,
      arch: process.arch,
      useragent: req.useragent,
      address: req.header('x-forwarded-for') || req.connection.remoteAddress,
    };
    console.log('process:', processInfo);
    res.json(processInfo);
  });
  app.route(`${url}/error`).get((req, res) => {
    res.json(notDefinded);
  });
};
