const express = require('express');
const router = express.Router();
const passport = require('../../scripts/passport-config');
//const conn = require('../../scripts/mongoose.js');

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
//                                  BACKEND

// POSSO ACCEDERE ALLA ROTTA USER/BACKENDLOGGED SOLO SE SONO AUTENTICATO
router.get('/backend', (req,res) => {
    if(req.isAuthenticated()) return res.redirect('/user/backendlogged');
    res.render('/backend');
});

// SE SONO AUTENTICATO VADO AL BACKENDLOGGED SENNO MI RIMANDA AL LOGIN
router.post('/backend', passport.authenticate('local-login', {
    successRedirect: '/user/backendlogged',
    failureRedirect: '/backend'
})); 

// IL LOGOUT MI RIMANDA AL BACKEND
router.get('/backendlogout', (req,res) => {
    req.logOut();
    res.redirect('/backend');
})

//                                  FRONTEND

// POSSO ACCEDERE ALLA ROTTA USER/DASHBOARD SOLO SE SONO AUTENTICATO
router.get('/frontend', (req,res) => {
    if(req.isAuthenticated()) return res.redirect('/user/dashboard');
    res.render('/frontend');
});

// SE SONO AUTENTICATO VADO A USER/DASHBOARD SENNO MI RIMANDA AL LOGIN
router.post('/frontend', passport.authenticate('local-login', {
    successRedirect: '/user/dashboard',
    failureRedirect: '/frontend'
})); 

// IL LOGOUT MI RIMANDA AL BACKEND
router.get('/frontendlogout', (req,res) => {
    req.logOut();
    res.redirect('/frontend');
})


module.exports = router;