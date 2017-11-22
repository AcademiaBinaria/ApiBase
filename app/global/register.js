const security = require("./../lib/security.js");
module.exports = (app, url) => {
  app.route(url).post((req, res) => register(req, res));
};

function register(req, res) {
  const user = req.body;
  if (security.userExists(user)) {
    sendInvalidUserResponse(user, res);
  } else {
    createUser(user);
    sendTokenForUser(user, res);
  }
}

function createUser(user, res) {
  console.log(`ok registering: ${user.email}`);
  security.saveUser(user);
}

function sendTokenForUser(user, res) {
  let token = security.getNewToken(user);
  res.status(201).json(token);
}

function sendInvalidUserResponse(user, res) {
  console.log(`email already registered: ${user.email}`);
  res.status(409).send(`email ${user.email} already registered`);
}
