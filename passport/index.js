const mongoose = require('mongoose');
const userSchema = require('./../models/users.model');

const User = mongoose.model('User', userSchema);

module.exports = {
    localStrategyHandler: async (email, password, done) => {
        const user = await User.findOne({email, password});
            if (!user) {
                return done(null, false); // (failure)
            }
            return done(null, user); //(success)
    },
    serializeUser: (user, done) => {
        done(null, user);
    },
    deserializeUser: (user, done) => {
        done(null, user);
    },
    isValid: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.sendStatus(401);
    }
}