const express = require('express');
const router = express.Router();
const passport = require('../../scripts/passport-config');
const conn = require('../../scripts/mongoose.js');

/*
// POSSO ACCEDERE ALLA ROTTA USER/DASHBOARD SOLO SE SONO AUTENTICATO
router.get('/login', (req,res) => {
    if(req.isAuthenticated()) return res.redirect('/user/dashboard');
    res.render('login');
});

// SE SONO AUTENTICATO VADO ALLA DASBOARD SENNO MI RIMANDA AL LOGIN
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/user/dashboard',
    failureRedirect: '/login'
})); 

// IL LOGOUT MI RIMANDA AL LOGIN
router.get('/logout', (req,res) => {
    req.logOut();
    res.redirect('/login');
})
*/

// POSSO ACCEDERE ALLA ROTTA USER/DASHBOARD SOLO SE SONO AUTENTICATO
router.get('/backendlogin', (req,res) => {
    if(req.isAuthenticated()) return res.redirect('/backendlogged');
    res.render('/backendlogin');
});

// SE SONO AUTENTICATO VADO ALLA DASBOARD SENNO MI RIMANDA AL LOGIN
router.post('/backendlogin', passport.authenticate('local-login', {
    successRedirect: '/backendlogged',
    failureRedirect: '/backendlogin'
})); 

// IL LOGOUT MI RIMANDA AL LOGIN
router.get('/logout', (req,res) => {
    req.logOut();
    res.redirect('/backendlogin');
})



module.exports = router;