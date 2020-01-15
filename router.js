// export a function from this file, import into index.js and pass (app) into that function, giving access to the app in index.js

//additional controllers would get routed here: buckets controller and files controller from ./controllers folder containing logic

const Authentication = require("./controllers/authentication");
const passportService = require("./services/passport")
const passport = require('passport')

//create middleware that we can re-use to check for authorization on any route 
//attempt to authenticate using passport with the 'jwt' strategy, and do not set a session cookie, which is true by default.
const requireAuth = passport.authenticate('jwt', {session:false})

//before a user can goto the Signin route handler to receive a JWT, verify they had signed in with a valid email/pw
//attempt to authenticate using passport with the 'local' strategy
const requireSignin = passport.authenticate('local', {session:false})

module.exports = function(app) {
  //test route
  // app.get("/", function(req, res, next) {
  //   res.send(["test", "test2", "test3"]);
  // });

  //test authenticated route using requireAuth middleware, if authenticated, can run callback function 
  app.get("/", requireAuth, function(req,res,next){
    res.send({hi:"user is authenticated and is allowed to see this route"})
  })

  //signup route handler
  //anything POSTed to /signup, run the signup function inside the Authentication controller imported above.
  app.post("/signup", Authentication.signup);

  //once user is auth'd, get a JWT
  app.post("/signin", requireSignin, Authentication.signin)
  //delete this comment after creating signin in authentication controller.
  //ERROR HERE: Authentication.signin cant find req.user, which should be coming from passport.js's user.comparePassword successfully running
};
