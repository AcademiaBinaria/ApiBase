const security = require("./../security/security.js");
module.exports = (app, url) => {
  app.route(url).post((req, res) => {
    let credential = req.body;
    if (security.isValidUser(credential)) {
      createSessionToken(credential, res);
    } else {
      sendInvalidToken(credential, res);
    }
  });
};

function sendInvalidToken(credential, res) {
  console.log(`Invalid credential: ${JSON.stringify(credential)}`);
  res.status(404).send("Invalid credential");
}

function createSessionToken(credential, res) {
  console.log(`accepted: ${credential.email}`);
  res.status(201).json(security.getNewToken(credential));
}
