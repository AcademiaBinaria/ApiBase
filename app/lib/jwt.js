const jwt = require("jsonwebtoken");

const secret = "http://academia-binaria.com";
const seconds = 60 * 60;

exports.createToken = user => {
  const token = jwt.sign({ email: user.email }, secret, { expiresIn: seconds });
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
