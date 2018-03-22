module.exports = (app, url, operations) => {
  // api/priv/operations
  app
    .route(url)
    .get((req, res) => {
      const userOperations = operations.filter(i => i.owner == req.email);
      if (userOperations && userOperations.length > 0) {
        res.json(userOperations);
      } else {
        res.status(204).send();
      }
    })
    .post((req, res) => {
      const operation = req.body;
      operation._id = new Date().getTime().toString();
      operation.owner = req.email;
      operations.push(operation);
      res.status(201).json(operation);
    })
    .delete((req, res) => {
      operations = [];
      res.status(204).send();
    });
  // // api/priv/operations/count
  app.route(`${url}/count`).get((req, res) => {
    const userOperations = operations.filter(i => i.owner == req.email);
    const count = userOperations ? userOperations.length : 0;
    res.json({ count: count });
  });
  // // api/priv/operations/314
  app
    .route(`${url}/:id`)
    .get((req, res) => {
      const index = getIndexByOwnerId(req.email, req.params.id);
      if (index >= 0) {
        res.json(operations[index]);
      } else {
        res.status(404).send();
      }
    })
    .put((req, res) => {
      const index = getIndexByOwnerId(req.email, req.params.id);
      if (index >= 0) {
        operations[index] = req.body;
        res.json(operations[index]);
      } else {
        res.status(404).send();
      }
    })
    .delete((req, res) => {
      const index = getIndexByOwnerId(req.email, req.params.id);
      if (index >= 0) {
        operations.splice(index, 1);
        res.status(204).send();
      } else {
        res.status(404).send();
      }
    });

  var getIndexByOwnerId = (owner, id) =>
    operations.findIndex(i => i.owner == owner && i._id == id);
};
