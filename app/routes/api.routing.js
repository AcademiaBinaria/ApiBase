const admin = require("./admin.js");
const register = require("./register.js");
const login = require("./login.js");
const items = require("./items.js");
const operations = require("./operations.js");

module.exports = app => {
  admin(app, "/api/pub/admin");
  register(app, "/api/pub/credentials/registration");
  login(app, "/api/pub/credentials/login");
  items(app, "/api/pub/items", []);
  operations(app, "/api/priv/operations", []);
  items(app, "/api/pub/journalentries", []);
  items(app, "/api/pub/monthbalances", []);
  operations(app, "/api/priv/journalentries", []);
  operations(app, "/api/priv/monthbalances", []);
};
