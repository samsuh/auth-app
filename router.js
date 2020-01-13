// export a function from this file, import into index.js and pass (app) into that function, giving access to the app in index.js

const Authentication = require("./controllers/authentication");
module.exports = function(app) {
  app.get("/", function(req, res, next) {
    res.send(["test", "test2", "test3"]);
  });
  // app.post("/signup", Authentication.signup);
};
