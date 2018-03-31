const express = require('express');
require('./services/passport');


const app = express();

require('./routes/authRoutes')(app); // authRoutes returns a function, then immediately call the function with the app object


const PORT = process.env.PORT || 5000;
app.listen(PORT);

// module.exports = {
//     googleClientID: '347502646278-4gf0i2040bkd3eq12sitsvh804jjh5kv.apps.googleusercontent.com',
//     googleClientSecret: '52S4YiMPz62E3QMw1jYH-7Hy'
// }