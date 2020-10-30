module.exports = (app, url, items) => {
  // api/pub/items
  app
    .route(url)
    .get((req, res) => {
      if (items && items.length > 0) res.json(items);
      else res.status(204).json([]);
    })
    .post((req, res) => {
      const item = req.body;
      item.id = item.id ? item.id : new Date().getTime().toString();
      items.push(item);
      res.status(201).json(item);
    })
    .delete((req, res) => {
      items = [];
      res.status(204).send();
    });
  // api/pub/items/count
  app.route(`${url}/count`).get((req, res) => {
    res.json({ count: items.length });
  });
  // api/pub/items/314
  app
    .route(`${url}/:id`)
    .get((req, res) => {
      const item = getItemById(req.params.id);
      if (item) res.json(item);
      else res.status(404).send();
    })
    .put((req, res) => {
      const item = getItemById(req.params.id);
      if (item) {
        item = req.body;
        res.json(item);
      } else {
        res.status(404).send();
      }
    })
    .delete((req, res) => {
      const index = getIndexById(req.params.id);
      if (index >= 0) {
        items.splice(index, 1);
        res.status(204).send();
      } else {
        res.status(404).send();
      }
    });

  const getIndexById = (id) => items.findIndex((i) => i.id == id);
  const getItemById = (id) => items.find((i) => i.id == id);
};
