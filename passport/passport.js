const passport = require('passport');
const User = require('../models/User');
const config = require('config');

passport.use(User.createStrategy());

const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const opts = {};
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.get('jwt.secret');

passport.use(
    new JWTStrategy(opts, (jwt_payload, done) => {
        User.findOne({ _id: jwt_payload.uid })
            .then(user => {
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false); 
                }
            })
            .catch(err => {
                return done(err, false);
            });
    })
);

module.exports = passport;