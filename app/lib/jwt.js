const jwt = require("jsonwebtoken");

const secret = "http://academia-binaria.com";
const seconds = 60 * 60;
const expiration = { expiresIn: seconds };

exports.createToken = user => {
  const payload = { email: user.email };
  const token = jwt.sign(payload, secret, expiration);
  return { token: token };
};

exports.verifyToken = token => {
  let decoded = false;
  try {
    decoded = jwt.verify(token, secret);
  } catch (err) {
    console.warn("Token not verified");
  }
  return decoded;
};
