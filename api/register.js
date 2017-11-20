const security = require("./../security/security.js");
module.exports = (app, url) => {
  app.route(url).post((req, res) => {
    const user = req.body;
    if (security.userExists(user)) {
      sendInvalidUser(user, res);
    } else {
      sendNewToken(user, res);
    }
  });
};

function sendNewToken(user, res) {
  console.log(`ok registering: ${user.email}`);
  security.createUser(user);
  let token = security.getNewToken(user);
  res.status(201).json(token);
}

function sendInvalidUser(user, res) {
  console.log(`email already registered: ${user.email}`);
  res.status(409).send(`email ${user.email} already registered`);
}
