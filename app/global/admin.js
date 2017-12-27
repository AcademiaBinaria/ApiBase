module.exports = (app, url) => {
  // api/priv/admin
  app.route(url).get((req, res) => {
    const processInfo = {
      env: process.env,
      platform: process.platform,
      arch: process.arch
    };
    res.json(processInfo);
  });
  app.route(`${url}/error`).get((req, res) => {
    throw new Error("An error inside");
  });
};
