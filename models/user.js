const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs')

//Define our Model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
  company: String,
  jobTitle: String,
});

//On Save Hook, encrypt password using bcrypt
//  before saving the model, run this hook/function
userSchema.pre('save', function(next){
  //get access to user model; an instance of the user model. user.email/user.password
  const user = this
  
  //generate a salt, which takes a moment, so we pass a callback function to run after a salt is generated. 
  bcrypt.genSalt(10, function(err, salt){
    if(err){return next(err)}

    //hash/encrypt the password using the salt. this also takes some time, so callback runs after hashed. 
    bcrypt.hash(user.password, salt, null, function(err, hash){
      if (err){return next(err)}

      //overwrite plaintext 'password' with encrypted password. the string stored in db contains both the salt and the hashed pw.
      user.password = hash;
      next();
    })
  })
})

//Helper to Compare Passwords for Signin; whenever we create a user object, it will have access to any functions we define on this property
//compare newly hashed password that user is attempting to sign in with, 'candidatePassword', with the 'salt+hashedPassword' stored in database, 'this.password', and run callback
//'this' refers to our user model
userSchema.methods.comparePassword = function(candidatePassword, callback){
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
    if (err){return callback(err)}

    //if theyre equal, isMatch is 'true' otherwise 'false'
    callback(null, isMatch)
  })
}

//Create the model class, loads 'user' into userSchema and tells mongoose there's a collection named 'user'
const ModelClass = mongoose.model("user", userSchema);

//Export the model
module.exports = ModelClass;
