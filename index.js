const express = require("express");
const app = express();
const port = 3030;

const middleware = require("./middleware");
middleware.useMiddleware(app);
require("./api/api.routing")(app);

app.listen(port);
console.log(`listening on port ${port}`);
