let items = [];

module.exports = (app, url) => {
  // api/priv/operations
  app
    .route(url)
    .get((req, res) => {
      const userItems = items.filter(i => i.owner == req.email);
      if (userItems && userItems.length > 0) {
        res.json(userItems);
      } else {
        res.status(204).send();
      }
    })
    .post((req, res) => {
      const item = req.body;
      item._id = new Date().getTime().toString();
      item.owner = req.email;
      items.push(item);
      res.status(201).json(item);
    })
    .delete((req, res) => {
      items = [];
      res.status(204).send();
    });
  // // api/priv/operations/count
  app.route(`${url}/count`).get((req, res) => {
    const userItems = items.filter(i => i.owner == req.email);
    const count = userItems ? userItems.length : 0;
    res.json({ count: count });
  });
  // // api/priv/operations/314
  app
    .route(`${url}/:id`)
    .get((req, res) => {
      const index = getIndexByOwnerId(req.email, req.params.id);
      if (index >= 0) {
        res.json(items[index]);
      } else {
        res.status(404).send();
      }
    })
    .put((req, res) => {
      const index = getIndexByOwnerId(req.email, req.params.id);
      if (index >= 0) {
        items[index] = req.body;
        res.json(items[index]);
      } else {
        res.status(404).send();
      }
    })
    .delete((req, res) => {
      const index = getIndexByOwnerId(req.email, req.params.id);
      if (index >= 0) {
        items.splice(index, 1);
        res.status(204).send();
      } else {
        res.status(404).send();
      }
    });

  var getIndexByOwnerId = (owner, id) =>
    items.findIndex(i => i.owner == owner && i._id == id);
};
