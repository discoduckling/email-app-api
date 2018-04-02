const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
    app.post('/api/stripe', requireLogin, async (req, res) => {
        // logic to handle the token and reach out to Stripe API

        // console.log(req.body);
        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: '$5 for 5 credits',
            source: req.body.id
        });
        // can access current user model through req.user b/c of passport
        req.user.credits += 5;
        const user = await req.user.save();

        res.send(user); // send user back to browser
    });
}