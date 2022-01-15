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


//                      REGISTRAZIONE NUOVO OGGETTO


const oggetto = require('../model/objectModel.js');


router.post("/objectregister", function(req, res){
    try{
        let newObject = new oggetto({
            game: req.body.game,
            platform: req.body.platform,
            annoUscita: req.body.annoUscita,
            stato: req.body.stato,
            condizione: req.body.condizione,
            etaMinima: req.body.etaMinima,
            peso: req.body.peso,
            numGiocatori: req.body.numGiocatori,
            prezzo: req.body.prezzo,
            disponibilita: req.body.disponibilita,
            quantita: req.body.quantita,
            img: req.body.img,    
    });
        newObject.save();
        res.redirect('/user/backendlogged');	
        
    }
    catch(error){
        res.status(500).send(error);
    }
},
);





module.exports = router;




