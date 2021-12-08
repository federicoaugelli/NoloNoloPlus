const express = require('express');
const router = express.Router();
//const passport = require('../../scripts/passport-config');


// POSSO ACCEDERE ALLA ROTTA USER/DASHBOARD SOLO SE SONO AUTENTICATO
router.get('/register', (req,res) => {
    //if(req.isAuthenticated()) return res.redirect('/user/dashboard-2');
    res.render('register');
});

/*
// SE SONO AUTENTICATO VADO ALLA DASBOARD SENNO MI RIMANDA AL LOGIN
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/user/dashboard',
    failureRedirect: '/frontend'
})); 



// IL LOGOUT MI RIMANDA AL LOGIN
router.get('/logout', (req,res) => {
    req.logOut();
    res.redirect('/register');
})

*/



module.exports = router;