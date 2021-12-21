const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportConfig = require('../../scripts/passport-config');
const passportConfig2 = require('../../scripts/passport-config2');


//                                                                                 PROVA DASHBOARD
/*
// POSSO ACCEDERE ALLA ROTTA USER/DASHBOARD SOLO SE SONO AUTENTICATO
router.get('/login', (req,res) => {
    if(req.isAuthenticated()) return res.redirect('/user/dashboard');
    res.render('login');
});

// SE SONO AUTENTICATO VADO ALLA DASBOARD SENNO MI RIMANDA AL LOGIN
router.post('/login', passport.authenticate('local-login3', {
    successRedirect: '/user/dashboard',
    failureRedirect: '/login'
})); 

// IL LOGOUT MI RIMANDA AL LOGIN
router.get('/logout', (req,res) => {
    req.logOut();
    res.redirect('/login');
})
*/






//                                                                                       LOGIN BACKEND

// POSSO ACCEDERE ALLA ROTTA USER/BACKENDLOGGED SOLO SE SONO AUTENTICATO
router.get('/docs/backend', (req,res) => {
    if(req.isAuthenticated()) return res.redirect('/user/backendlogged');
    else return res.render('/docs/backend');
});


//                SE SONO AUTENTICATO VADO AL BACKENDLOGGED SENNO MI RIMANDA AL LOGIN
router.post('/docs/backend', passport.authenticate('local-login-dipendente', {
    successRedirect: '/user/backendlogged',
    failureRedirect: '/docs/backend'
    //successFlash: 'Welcome!'
})); 



//                            IL LOGOUT MI RIMANDA AL BACKEND
router.get('/backendlogout', (req,res) => {
    req.logOut();
    res.redirect('/docs/backend');
})








//                                                                                        LOGIN FRONTEND

//              POSSO ACCEDERE ALLA ROTTA USER/DASHBOARD SOLO SE SONO AUTENTICATO
router.get('/docs/frontend', (req,res) => {
    if(req.isAuthenticated()) return res.redirect('/user/dashboard');
    res.render('/docs/frontend');
});



// SE SONO AUTENTICATO VADO A USER/DASHBOARD SENNO MI RIMANDA AL LOGIN
router.post('/docs/frontend', passport.authenticate('local-login-cliente', {
    successRedirect: '/docs/frontend',
    failureRedirect: '/docs/frontend'
})); 


//               IL LOGOUT MI RIMANDA AL BACKEND
router.get('/frontendlogout', (req,res) => {
    req.logOut();
    res.redirect('/docs/frontend');
})



module.exports = router;