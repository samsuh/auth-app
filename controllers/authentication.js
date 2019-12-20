const User = require("../models/user");
exports.signup = function(req, res, next) {
  //pull data out of request object. req.body from the 'post' request.
  console.log("req.body is: ", req.body);
  const email = req.body.email;
  const password = req.body.password;

  //See if user with given email exists; search all users for a matching email, return an error, or return existingUser (which is either null or contains user)
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) {
      return next(err);
    }
    //if a user with email exists, return error
    if (existingUser) {
      return res.status(422).send({ error: "email is in use" });
    }
    //if user with email does not exist, create and save user record
    const user = new User({
      email: email,
      password: password,
    });
    user.save(function(err) {
      return next(err);
    });
    //respond to request indicating the user was created
    res.json(user);
  });
};
