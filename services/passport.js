//configuration/logic to set up passport to authenticate a user when they try to visit an auth-required route 
const passport= require('passport');
const User = require('../models/user');
const keys = require('../config/keys');

//We need to give users the ability to sign in once theyve signed up -- login
//passport will either verify a user with a JWT on signup or with username/password (called LocalStrategy)
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local')


//set up and configure JwtStrategy, pass additional options. 
//JWT can be anywhere on the request (body/URL/headers). tell Strategy where to look in the request. 
const jwtOptions = {
    //whenever a request comes in and we want passport to handle it, it should look at the Header and look for a Header called 'authorization' for the token.
    //also give it the secret it should use to decode the token
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: keys.JwtSecret
}

//Create JWT Strategy
//callback runs when a user tries to login using jwt, and we need to authenticate a user using JwtStrategy
//'payload' is the decoded JWT consisting of 'sub' and 'iat'
//'done' is a callback function we need to call depending on if we can authenticate user
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
    //see if the user ID in the payload (on the payload's 'sub' property) exists in our database. 
    //if user exists in db, call 'done' callback from passport. otherwise call 'done' with a 'false' user object meaning 'not authenticated' 
    //err is only populated if search failed and couldnt run.
    User.findById(payload.sub, function(err, user){
        //this is the 'done' callback function. 
        //if err, we never got to run the db query. return err and say we failed to search for user. 'false', as user not authenticated. 
        if (err){return done(err, false)}

        //if we found a user, error is null, and return the user that we found, 'user'. 
        //else return that there was no error searching the db, but 'false' that we did not find such a user, meaning they dont exist in db. 
        if (user){
            done(null, user)
        } else {
            done(null, false)
        }
    })
})




//Create Local Strategy; local database to check email/pw for user log in. 
//first parameter of LocalStrategy tells passport where to look in our request for the username/pw. we're using email, not username.
//localStrategy by default will find automatically the password field for us, but looks for 'username' property. 
const localOptions = {usernameField:'email'}
const localLogin = new LocalStrategy( localOptions, function(email, password, done){
    //Verify this email/password provided in the request matches one in our database, call 'done' with the 'user' if correct email/pw
    User.findOne({email:email}, function(err, user){
        //if there's an error in the search 
        if (err){return done(err)}
        //if user not in the database, call 'done' with 'false' instead of 'user'
        if (!user){return done(null,false)}

        //if email provided found in db, compare password provided to one in db (user.password), which is 'salt+hashedPassword'. 
        //take salt from stored encrypted user.password, use it to encrypt the submitted plaintext password. Compare newly hashedPassword with stored hashedPassword. 
        //we never actually decrypt the savedPassword
        //user is the user we found with the matching email in db. comparePassword is the userSchema method we defined in user.js
        //'password' is the pw from the request. if theyre the same, call the passport callback with the 'user' model or 'false' meaning the user doesnt exist. 
        user.comparePassword(password, function(err, isMatch){
            if (err) {return done(err)}
            //If not correct email/pw, call 'done' with 'false'
            if (!isMatch){ return done(null, false)}
            //by default, run callback with 'user'
            console.log("user matched from the database: ", user)
            return done(null, user)
        })
    })
})


//Tell passport to use this JWT strategy "jwtLogin" we created above 
passport.use(jwtLogin)
//Tell passport to use thie Local Strategy we created above 
passport.use(localLogin)

//verify a user is authenticated when they try to visit a protected resource on some routes. For protected routes, check with passport before allowing user to proceed.
//did they include a jwt with the request, and if they did, is it a valid token? 
//this is done in router.js 




