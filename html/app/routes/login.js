const { response, request } = require('express');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportConfig = require('../../scripts/passport-config');
const checkUserLogin = require('../middleware/check-user-login');
//const passportConfig2 = require('../../scripts/passport-config2');
//const passportConfig3 = require('../../scripts/passport-config3');

//const cookieParser = require('cookie-parser');
//app.use(cookieParser());
//                                                                                       LOGIN BACKEND

// POSSO ACCEDERE ALLA ROTTA USER/BACKENDLOGGED SOLO SE SONO AUTENTICATO
router.get('/docs/backend', (req,res) => {
    if(req.isAuthenticated()) return res.redirect('/user/backendlogged');
    res.render('/docs/backend');
});

router.get('/user/backendlogged', function(req, res){
    const { user: { username } = {} } = req;
    console.log(username)
    res.render('backofficelogged', {username});
    });

//                SE SONO AUTENTICATO VADO AL BACKENDLOGGED SENNO MI RIMANDA AL LOGIN
router.post('/docs/backend', passport.authenticate('local-login-dipendente', {
    successRedirect: '/user/backendlogged',
    failureRedirect: '/docs/backend'
})); 



//                            IL LOGOUT MI RIMANDA AL BACKEND
router.get('/backendlogout', (req,res) => {
    req.logOut();
    res.redirect('/docs/backend');
})








//                                                                                        LOGIN FRONTEND

//              POSSO ACCEDERE ALLA ROTTA USER/FRONTENDLOGGED SOLO SE SONO AUTENTICATO
router.get('/docs/frontend', (req,res) => {
    if(req.isAuthenticated()) return res.redirect('/user/frontendlogged');
    res.render('/docs/frontend');
    //console.log(req.user);
});


router.get('/user/frontendlogged', function(req, res){
    const { user: { username } = {} } = req;
    console.log(username)
    res.render('frontofficelogged', {username});
    });



// SE SONO AUTENTICATO VADO A USER/FRONTENDLOGGED SENNO MI RIMANDA AL LOGIN
router.post('/docs/frontend', passport.authenticate('local-login-cliente', {
    successRedirect: '/user/frontendlogged' , 
    failureRedirect: '/docs/frontend'
    
    
}), (request, response) => {

    console.log(request.user)
    response.render()
}); 


//               IL LOGOUT MI RIMANDA AL FRONTEND
router.get('/frontendlogout', (req,res) => {
    req.logOut();
    res.redirect('/docs/frontend');
})




//                                                                                        LOGIN DASHBOARD

//              POSSO ACCEDERE ALLA ROTTA USER/DASHBOARD SOLO SE SONO AUTENTICATO
router.get('/docs/dashboard', (req,res) => {
    if(req.isAuthenticated()) return res.redirect('/user/dashboardlogged');
    res.render('/docs/dashboard');
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