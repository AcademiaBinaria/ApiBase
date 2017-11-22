const security = require("./../lib/security.js");
module.exports = (app, url) => {
  app.route(url).post((req, res) => {
    let credential = req.body;
    if (security.isValidUser(credential)) {
      const sessionToken = createSessionToken(credential, res);
      sendSessionToken(sessionToken, res);
    } else {
      sendInvalidTokenMessage(credential, res);
    }
  });
};

function sendInvalidTokenMessage(credential, res) {
  console.log(`Invalid credential: ${JSON.stringify(credential)}`);
  res.status(404).send("Invalid credential");
}

function createSessionToken(credential) {
  console.log(`accepted: ${credential.email}`);
  return security.getNewToken(credential);
}

function sendSessionToken(sessionToken, res) {
  res.status(201).json(sessionToken);
}
