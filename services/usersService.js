const mongoose = require('mongoose');
const userSchema = require('./../models/users.model');

const User = mongoose.model('User', userSchema);

const Signup = async ({firstName, lastName, email, password, city, street}) => {
    try {
    const u = new User({firstName, lastName, email, password, city, street, isAdmin: 0});
    return await u.save();
    } catch(err) {
        console.log(err);
        throw err;
    };
};

module.exports = { Signup };