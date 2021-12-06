const express = require('express');
const router = express.Router();
const passport = require('../../scripts/passport-config');

router.get('/login', (req,res) => {
    if(req.isAuthenticated()) return res.redirect('/user/dashboard');
    res.render('login');
});

router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/user/dashboard',
    failureRedirect: '/login'
})); 

router.get('/logout', (req,res) => {
    req.logOut();
    res.redirect('/login');
})

module.exports = router;