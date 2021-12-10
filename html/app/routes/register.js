const express = require('express');
const router = express.Router();
const passport = require('../../scripts/passport-config');
const Bcrypt = require("bcryptjs");


// REGISTRAZIONE NUOVO DIPENDENTE IN MONGO
const registrodipendenti = require('../model/dipendentiModel.js');

router.post("/backendregister", function(req, res){
    try{
        let newUser = new registrodipendenti({
            username: req.body.username,
            password: Bcrypt.hashSync(req.body.password, 10),
            ruolo: req.body.ruolo
        });
        newUser.save();
        res.redirect('/backend');	
    }
    catch(error){
        res.status(500).send(error);
    }
     
}, 
    passport.authenticate('local-register', {
      
        successRedirect: '/user/backendlogged',
        failureRedirect: '/backend'
}));

// REGISTRAZIONE NUOVO CLIENTE IN MONGO
const registroclienti = require('../model/clientiModel.js');

router.post("/frontendregister", function(req, res){
    try{
        let newUser = new registroclienti({
            username: req.body.username,
            password: Bcrypt.hashSync(req.body.password, 10),
            email: req.body.email    
    });
        newUser.save();
        res.redirect('/frontend');	 
    }
    catch(error){
        res.status(500).send(error);
    }
},
    passport.authenticate('local-register', {
      
        successRedirect: '/user/dashboard-2',
        failureRedirect: '/frontend'
}));


/*
router.post('/backend', passport.authenticate('local-login', {
    successRedirect: '/user/backendlogged',
    failureRedirect: '/backend'
})); 


// IL LOGOUT MI RIMANDA AL LOGIN
router.get('/logout', (req,res) => {
    req.logOut();
    res.redirect('/register');
})

*/



module.exports = router;