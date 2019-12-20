// export a function from this file, import into index.js and pass (app) into that function, giving access to the app in index.js
module.exports = function(app) {
  app.get("/", function(req, res, next) {});
};
