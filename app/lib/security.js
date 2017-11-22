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
      req.email = user.email;
      next();
    } else {
      res.status(401).send("Invalid credentials");
    }
  });
}

function getUser(req) {
  const authorization = req.get("Authorization");
  const pieces = authorization.split(" ");
  if (pieces && pieces.length > 0) {
    const token = pieces[1];
    return jwt.verifyToken(token);
  }
  return null;
}

function checkUsers(user, test) {
  return test.email == user.email && test.password == user.password;
}
