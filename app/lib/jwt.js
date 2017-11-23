const jwt = require("jsonwebtoken");

const secret = "http://academia-binaria.com";
const seconds = 60 * 60;
const expiration = { expiresIn: seconds };

exports.createToken = function(user) {
  const payload = { email: user.email };
  const token = jwt.sign(payload, secret, expiration);
  return { token: token };
};

exports.verifyToken = function(token) {
  return jwt.verify(token, secret);
};
