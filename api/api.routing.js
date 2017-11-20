const register = require('./register.js');
const login = require('./login.js');
const items = require('./items.js');
const operations = require('./operations.js');

module.exports = app => {
    register(app, '/api/pub/register');
    login(app, '/api/pub/login');
    items(app, '/api/pub/items');
    operations(app, '/api/priv/operations');
}
