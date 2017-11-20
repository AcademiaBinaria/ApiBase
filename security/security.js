const jwt = require("./jwt");
const users = [];

module.exports = {
  useSecurity: useSecurity,
  userExists: user => users.some(u => u.email == user.email),
  createUser: user => users.push(user),
  isValidUser: user => users.filter(u => checkUsers(user, u))[0],
  getNewToken: user => jwt.createToken(user)
};

function useSecurity(app, url) {
  app.use(url, (req, res, next) => {
    const token = getToken(req);
    if (token) {
      req.user = token.email;
      next();
    } else {
      res.status(401).send("Invalid credentials");
    }
  });
}

function getToken(req) {
  const authorization = req.get("Authorization");
  const pieces = authorization.split(" ");
  if (pieces && pieces.length > 0) {
    const authToken = authorization.split(" ")[1];
    return jwt.verifyToken(authToken);
  }
  return null;
}

function checkUsers(user, test) {
  return test.email == user.email && test.password == user.password;
}
