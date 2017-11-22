const jwt = require("./jwt");
const users = [{ email: "admin@cash-flow.com", password: "secret" }];

module.exports = {
  useSecurity: useSecurity,
  userExists: user => users.some(u => u.email == user.email),
  saveUser: user => users.push(user),
  isValidUser: user => users.filter(u => checkUsers(user, u))[0],
  getNewToken: user => jwt.createToken(user)
};

function useSecurity(app, url) {
  app.use(url, (req, res, next) => {
    const user = getUser(req);
    if (user) {
      singRequest(req, user);
      next();
    } else {
      sendInvalidCredentialsMessage(res);
    }
  });
}

function singRequest(req, user) {
  req.email = user.email;
}

function sendInvalidCredentialsMessage(res) {
  res.status(401).send("Invalid credentials");
}

function getUser(req) {
  const token = getAuthorizationToken(req);
  const user = jwt.verifyToken(token);
  return user;
}

function getAuthorizationToken(req) {
  const authorization = req.get("Authorization");
  const chunks = authorization.split(" ");
  if (chunks && chunks.length > 0) {
    return chunks[1];
  } else {
    return null;
  }
}

function checkUsers(user, test) {
  return test.email == user.email && test.password == user.password;
}
