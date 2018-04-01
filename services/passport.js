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
    }, 
    async (accessToken, refreshToken, profile, done) => {
        const existingUser = await User.findOne({ googleId: profile.id })
        if (existingUser) {
            // we already have a record with the given profile id
            return done(null, existingUser); // first argument is null, normally it would pass back an error but we no there will be no error here
        }
         
        const user = await new User({ googleId: profile.id }).save()
        done(null, user);
        
    })
); // creates a new instance of google strategy

