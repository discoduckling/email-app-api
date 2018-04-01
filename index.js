const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, // how long cookie can exist before it expires in ms
        keys: [keys.cookieKey] // to sign or encrypt the cookie
    })
);
app.use(passport.initialize()); // tells passport to use cookies
app.use(passport.session());

require('./routes/authRoutes')(app); // authRoutes returns a function, then immediately call the function with the app object


const PORT = process.env.PORT || 5000;
app.listen(PORT);
