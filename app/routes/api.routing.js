const admin = require("./admin.js");
const categories = require("./categories.js");
const items = require("./items.js");
const hello = require("./hello.js");
const login = require("./login.js");
const operations = require("./operations.js");
const projects = require("./projects.js");
const register = require("./register.js");

module.exports = app => {
  const pub = "/api/pub/";
  const priv = "/api/priv/";
  admin(app, "/api/pub/admin");
  categories(app, pub + "categories");
  hello(app, "/api/pub/hello");
  items(app, pub + "items", []);
  items(app, pub + "journalentries", []);
  items(app, pub + "monthbalances", []);
  items(app, pub + "rates", []);
  login(app, pub + "credentials/login");
  operations(app, priv + "journalentries", []);
  operations(app, priv + "monthbalances", []);
  operations(app, priv + "operations", []);
  operations(app, priv + "travels", []);
  projects(app, pub + "projects", []);
  projects(app, pub + "tasks", []);
  register(app, pub + "credentials/registration");
};
