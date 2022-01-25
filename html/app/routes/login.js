const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportConfig = require('../../scripts/passport-config');
const passportConfig2 = require('../../scripts/passport-config2');
const passportConfig3 = require('../../scripts/passport-config3');



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

//              POSSO ACCEDERE ALLA ROTTA USER/FRONTENDLOGGED SOLO SE SONO AUTENTICATO
router.get('/docs/frontend', (req,res) => {
    if(req.isAuthenticated()) return res.redirect('/user/frontendlogged')
    else return res.render('/docs/frontend');
    //console.log(req.user);
});



// SE SONO AUTENTICATO VADO A USER/FRONTENDLOGGED SENNO MI RIMANDA AL LOGIN
router.post('/docs/frontend', passport.authenticate('local-login-cliente', {
    successRedirect: '/user/frontendlogged' , 
    failureRedirect: '/docs/frontend'  
})); 


//               IL LOGOUT MI RIMANDA AL FRONTEND
router.get('/frontendlogout', (req,res) => {
    req.logOut();
    //req.session.destroy();
    res.redirect('/docs/frontend');
})




//                                                                                        LOGIN DASHBOARD

//              POSSO ACCEDERE ALLA ROTTA USER/DASHBOARD SOLO SE SONO AUTENTICATO
router.get('/docs/dashboard', (req,res) => {
    if(req.isAuthenticated()) return res.redirect('/user/dashboardlogged');
    else return res.render('/docs/frontend');
});



// SE SONO AUTENTICATO VADO A USER/DASHBOARD SENNO MI RIMANDA AL DASHBOARD LOGIN
router.post('/docs/dashboard', passport.authenticate('local-login-manager', {
    successRedirect: '/user/dashboardlogged',
    failureRedirect: '/docs/dashboard'
})); 


//               IL LOGOUT MI RIMANDA AL BACKEND
router.get('/dashboardlogout', (req,res) => {
    req.logOut();
    res.redirect('/docs/dashboard');
})




module.exports = router;