module.exports = (app, url, projects) => {
  // api/pub/projets
  app
    .route(url)
    .get((req, res) => {
      const userProjects = projects.filter(i => i.owner == getOwner(req));
      if (userProjects && userProjects.length > 0) {
        res.json(userProjects);
      } else {
        res.status(204).send();
      }
    })
    .post((req, res) => {
      const project = req.body;
      project._id = project._id ? project._id : new Date().getTime().toString();
      project.owner = getOwner(req);
      projects.push(project);
      res.status(201).json(project);
    })
    .delete((req, res) => {
      projects = projects.filter(i => i.owner !== getOwner(req));
      res.status(204).send();
    });
  // api/pub/projects/count
  app.route(`${url}/count`).get((req, res) => {
    const userProjects = projects.filter(i => i.owner == getOwner(req));
    const count = userProjects ? userProjects.length : 0;
    res.json({ count: count });
  });
  // api/pub/projects/314
  app
    .route(`${url}/:id`)
    .get((req, res) => {
      const project = getProjectByOwnerId(getOwner(req), req.params.id);
      if (project) {
        res.json(project);
      } else {
        res.status(404).send();
      }
    })
    .put((req, res) => {
      const project = getProjectByOwnerId(getOwner(req), req.params.id);
      if (project) {
        project = req.body;
        res.json(project);
      } else {
        res.status(404).send();
      }
    })
    .delete((req, res) => {
      const index = getIndexByOwnerId(getOwner(req), req.params.id);
      if (index >= 0) {
        projects.splice(index, 1);
        res.status(204).send();
      } else {
        res.status(404).send();
      }
    });

  const getIndexByOwnerId = (owner, id) => projects.findIndex(i => i.owner == owner && i._id == id);
  const getProjectByOwnerId = (owner, id) => projects.find(i => i.owner == owner && i._id == id);
  const getOwner = req => {
    const useragent = req.get('User-Agent');
    const address = req.header('x-forwarded-for') || req.connection.remoteAddress;
    const owner = useragent + address;
    return owner;
  };
};
