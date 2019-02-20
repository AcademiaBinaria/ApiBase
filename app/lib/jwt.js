const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET || 'http://academia-binaria.com';
const session_seconds = 60 * 60;
const expiration = { expiresIn: session_seconds };

exports.createToken = function(user) {
  const payload = { email: user.email };
  const token = jwt.sign(payload, SECRET, expiration);
  return { token };
};

exports.verifyToken = token => jwt.verify(token, SECRET);
