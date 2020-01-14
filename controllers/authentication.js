//process requests here; pull in request object and response object, run some logic and ultimately respond to it. 
//POST requests to the /signup route runs the Authentication.signup function from here. 

const User = require("../models/user");
exports.signup = function(req, res, next) {
  //test route. use Postman to send a POST request to /signup route
  //res.send({success:'true'})
  
  //pull data out of request object. req.body from the 'post' request. req object has the data about the incoming request. 
  //POST requests have a req.body property which is an empty object by default. if we POST JSON data along, it POSTS as req.body (JSON format expected; email/pw/company/jobTitle will be  passed along)
  console.log("req.body is: ", req.body);
  const email = req.body.email;
  const password = req.body.password;
  const company = req.body.company;
  const jobTitle = req.body.jobTitle;

  //guarding against case where user does not send email or password from server-side before .save called on record
  // TO DO: can add server-side regex validation of email syntax
  if(!email||!password){
    return res.status(422).send({error: 'You must provide email and password'})
  }

  //See if user with given email exists; search all users for a matching email, return an error, or return existingUser (which is either null or contains user)
  //  User here represents the class of User; represents all users (entire collection of records saved in db) not a single user.
  //  findOne in User (first arg is the search criteria we want to use, where property email equals req.body.email above)
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) {
      return next(err);
    }
    //if a user with email DOES exists, return error
    if (existingUser) {
      return res.status(422).send({ error: "email is in use" });
    }
    //if user with email DOES NOT exist, create a new instance of the User model, creating the record. not yet saved to db until the .save 
    const user = new User({
      email: email,
      password: password,
      company: company, 
      jobTitle: jobTitle
    });
    user.save(function(err) {
      return next(err);
    });
    //respond to request indicating the user was created. 
    //test response: sending back the full user record for now. bad because sending back their pw too. 
    // res.json(user);
    //send back a success so we're not sending back the full user record. 
    res.json({success: true})
  });
};
