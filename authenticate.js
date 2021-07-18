// Passport uses the concept of strategies to authenticate requests. Strategies can range from verifying username and password credentials, delegated authentication using OAuth (for example, via Facebook or Twitter), or federated authentication using OpenID.

var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy;
var User=require('./models/users');
// for passport
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');

var config=require('./config');
var FacebookTokenStrategy=require("passport-facebook-token");




passport.use(new LocalStrategy(User.authenticate()));
// Let's now configure the passport with the new local strategy and then we will export this from this file because this is going to be a node module. So using exports.local and in passport,  here so we'll say passport use and say new LocalStrategy and then this is where the functions that are supported by the passport-local-mongoose comes to our help.
//  So the local strategy will need to be supplied with the verify function. Inside this function we will verify the user. This verify function will be called with the "username" and "password" that passport will extract from our incoming request. Now in the incoming request for the LocalStrategy the username and password should be supplied in the body of the message in the form of a Json string.

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


exports.getToken=function(user){
    return jwt.sign(user,config.secretKey,
        {expiresIn:3600});
};
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts,
    (jwt_payload, done) => {
        console.log("JWT payload: ", jwt_payload);
        User.findOne({_id: jwt_payload._id}, (err, user) => {
            if (err) {
                return done(err, false);
            }
            else if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }));

exports.verifyUser = passport.authenticate('jwt', {session: false});


// exports.verifyAdmin = function(req, res, next) {
//     User.findOne({_id: req.user._id})
//     .then((user) => {
//         console.log("User: ", req.user);
//         if (user.admin) {
//             next();
//         }
//         else {
//             err = new Error('You are not authorized');
//             err.status = 403;
//             return next(err);
//         } 
//     }, (err) => next(err))
//     .catch((err) => next(err))
// }


exports.verifyAdmin=(req,res,next)=>{
    if (req.user.admin){
        next();


    }
    else{
        var err=new Error("You are not aiuthorised to perform this activity");
        err.status=403;
        return next(err);
    }
};

exports.facebookPassport = passport.use(new FacebookTokenStrategy({
    clientID: config.facebook.clientId,
    clientSecret: config.facebook.clientSecret
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({facebookId: profile.id}, (err, user) => {
        if (err) {
            return done(err, false);
        }
        if (!err && user !== null) {
            return done(null, user);
        }
        else {
            user = new User({ username: profile.displayName });
            user.facebookId = profile.id;
            user.firstname = profile.name.givenName;
            user.lastname = profile.name.familyName;
            user.save((err, user) => {
                if (err)
                    return done(err, false);
                else
                    return done(null, user);
            })
        }
    });
}







));





