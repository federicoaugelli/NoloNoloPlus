const express = require('express');
const router = express.Router();
const passport = require('../../scripts/passport-config');

router.get('/register', (req,res) => {
    if(!req.isAuthenticated()) return res.redirect('/user/dashboard-2');
    res.render('login');
});

router.post('/register', passport.authenticate('local-register', {
    successRedirect: '/user/dashboard-2',
    failureRedirect: '/frontend'
})); 

// IL LOGOUT MI RIMANDA AL LOGIN
router.get('/logout', (req,res) => {
    req.logOut();
    res.redirect('/frontend');
})