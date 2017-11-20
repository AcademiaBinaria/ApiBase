let items = [];

module.exports = (app, url) => {
  // api/pub/items
  app
    .route(url)
    .get((req, res) => {
      if (items && items.length > 0) res.json(items);
      else res.status(204).send();
    })
    .post((req, res) => {
      const item = req.body;
      item._id = new Date().getTime().toString();
      items.push(item);
      res.status(201).json(item);
    })
    .delete((req, res) => {
      items = [];
      res.status(204).send();
    });
  // // api/pub/items/314
  app
    .route(`${url}/:id`)
    .get((req, res) => {
      const index = getIndexById(req.params.id);
      if (index >= 0) res.json(items[index]);
      else res.status(404).send();
    })
    .put((req, res) => {
      const index = getIndexById(req.params.id);
      if (index >= 0) {
        items[index] = req.body;
        res.json(items[index]);
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

  var getIndexById = id => items.findIndex(i => i._id == id);
};
