//prod env variables not set up yet because not live anywhere.
module.exports = {
  mongoURI: process.env.MONGO_URI,
  JwtSecret: process.env.JWT_SECRET,
  sendGridKey: process.env.SENDGRID_KEY
};
