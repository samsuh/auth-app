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

//Create the model class, loads 'user' into userSchema and tells mongoose there's a collection named 'user'
const ModelClass = mongoose.model("user", userSchema);

//Export the model
module.exports = ModelClass;
