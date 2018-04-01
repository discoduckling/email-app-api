const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users'); // don't need to import User, just call it from mongoose

passport.serializeUser((user, done) => {
    done(null, user.id); // .id is a short cut to _id in mongodb
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        })
});

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({ googleId: profile.id })
            .then(existingUser => {
                if (existingUser) {
                    // we already have a record with the given profile id
                    done(null, existingUser); // first argument is null, normally it would pass back an error but we no there will be no error here
                } else {
                    new User({ googleId: profile.id })
                        .save()
                        .then(user => done(null, user));
                }
            })
    })
); // creates a new instance of google strategy

