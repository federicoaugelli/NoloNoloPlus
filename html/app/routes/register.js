const express = require('express');
const router = express.Router();
//const passport = require('../../scripts/passport-config');
const Bcrypt = require("bcryptjs");



//                      REGISTRAZIONE NUOVO CLIENTE IN MONGO


const registroclienti = require('../model/clientiModel.js');


router.post("/frontendregister", function(req, res){
    try{
        let newUser = new registroclienti({
            username: req.body.username,
            password: Bcrypt.hashSync(req.body.password, 10),
            indirizzo: req.body.indirizzo    
    });
        newUser.save();
        res.redirect('/frontend');	 
    }
    catch(error){
        res.status(500).send(error);
    }
},
);



module.exports = router;




