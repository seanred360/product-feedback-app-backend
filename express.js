const app = require("express")();
const server = require("http").createServer(app);

module.exports = function () {
  var app = express();
  app.set("port", 3000);
  return app;
};
