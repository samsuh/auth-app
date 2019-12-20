const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Define our Model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
});

//Create the model class, loads 'user' into userSchema and tells mongoose there's a collection named 'user'
const ModelClass = mongoose.model("user", userSchema);

//Export the model
module.exports = ModelClass;
