const express = require('express');
const router = express.Router();
const passport = require('passport');
const {Signup} = require('../services/usersService');

router.post('/login',
    passport.authenticate('local'),
    (req, res) => {
        res.json(req.user);
});

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.sendStatus(400);
        }
        req.logout();
        res.cookie('connect.sid', req.cookies['connect.sid'], {maxAge: -1});
        res.sendStatus(200);
    });
});

router.post('/signup', async (req, res) => {
    try {
        await Signup(req.body);
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    };
});

router.get('/userDetails', async (req, res) => {
    try {
        return res.json(req.user)
    } catch(err) {
        return res.sendStatus(400);
    }
});

module.exports = router;

