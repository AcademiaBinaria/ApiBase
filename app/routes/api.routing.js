const admin = require('./admin.js');
const register = require('./register.js');
const login = require('./login.js');
const items = require('./items.js');
const categories = require('./categories.js');
const operations = require('./operations.js');

module.exports = app => {
  const pub = '/api/pub/';
  const priv = '/api/priv/';
  admin(app, '/api/pub/admin');
  categories(app, pub + 'categories');
  items(app, pub + 'items', []);
  items(app, pub + 'journalentries', []);
  items( app, pub + 'monthbalances', [] );
  items(app, pub + 'projects', []);
  items(app, pub + 'rates', []);
  login(app, pub + 'credentials/login');
  operations(app, priv + 'journalentries', []);
  operations(app, priv + 'monthbalances', []);
  operations(app, priv + 'operations', []);
  operations(app, priv + 'travels', []);
  register(app, pub + 'credentials/registration');
};
