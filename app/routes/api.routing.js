const admin = require("./admin.js");
const register = require("./register.js");
const login = require("./login.js");
const items = require("./items.js");
const categories = require("./categories.js");
const operations = require("./operations.js");

module.exports = app => {
  admin(app, "/api/pub/admin");
  categories(app, "/api/pub/categories");
  items(app, "/api/pub/items", []);
  items(app, "/api/pub/journalentries", []);
  items(app, "/api/pub/monthbalances", []);
  login(app, "/api/pub/credentials/login");
  operations(app, "/api/priv/journalentries", []);
  operations(app, "/api/priv/monthbalances", []);
  operations(app, "/api/priv/operations", []);
  operations(app, "/api/priv/travels", []);
  register(app, "/api/pub/credentials/registration");
};
