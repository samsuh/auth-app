// export a function from this file, import into index.js and pass (app) into that function, giving access to the app in index.js

//additional controllers would get routed here: buckets controller and files controller from ./controllers folder containing logic

const Authentication = require("./controllers/authentication");

module.exports = function(app) {
  //test route
  app.get("/", function(req, res, next) {
    res.send(["test", "test2", "test3"]);
  });
  //signup route handler
  //anything POSTed to /signup, run the signup function inside the Authentication controller imported above.
  app.post("/signup", Authentication.signup);
};
