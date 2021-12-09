const express = require('express');
const router = express.Router();
//const passport = require('../../scripts/passport-config');
const mongoose = require("mongoose");
const conn = require('../../scripts/mongoose.js');
//const LocalStrategy = require("passport-local");
//const passportLocalMongoose = require("passport-local-mongoose");


// POSSO ACCEDERE ALLA ROTTA USER/DASHBOARD SOLO SE SONO AUTENTICATO
router.get('/register', (req,res) => {
    if(req.isAuthenticated()) return res.redirect('/backendlogged');
    res.render('register');
});

const registroutenti = require('../model/userModel.js');

router.post("/register", function(req, res){
    let newUser = new registroutenti({
        username: req.body.username,
        password: req.body.password,
        ruolo: req.body.ruolo
    });
    newUser.save();
    res.redirect('/user/dashboard-2');	 
})

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