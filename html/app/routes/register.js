const express = require('express');
const router = express.Router();
const Bcrypt = require("bcryptjs");


//                      REGISTRAZIONE NUOVO CLIENTE IN MONGO


const registroclienti = require('../model/clientiModel.js');


router.post("/frontendregister", function(req, res){
    try{
        let newUser = new registroclienti({
            nome: req.body.nome,
            cognome: req.body.cognome,
            username: req.body.username,
            password: Bcrypt.hashSync(req.body.password, 10),
            indirizzo: req.body.indirizzo,
            punti: 0    
    });
        newUser.save();
        res.redirect('/docs/frontend');	 
    }
    catch(error){
        res.status(500).send(error);
    }
},
);





module.exports = router;




