module.exports = (app, url) => {
  // api/priv/admin
  app.route(url).get((req, res) => {
    res.json(process);
  });
};
