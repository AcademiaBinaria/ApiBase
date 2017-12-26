const jwt = require("jsonwebtoken");

const secret = "http://academia-binaria.com";
const SECRET = process.env.SECRET || "secret";
const session_seconds = 60 * 60;
const expiration = { expiresIn: session_seconds };

exports.createToken = function(user) {
  const payload = { email: user.email };
  const token = jwt.sign(payload, SECRET, expiration);
  return { token };
};

exports.verifyToken = function(token) {
  return jwt.verify(token, SECRET);
};
