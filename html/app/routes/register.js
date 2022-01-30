const express = require('express');
const router = express.Router();
const Bcrypt = require("bcryptjs");


//                      REGISTRAZIONE NUOVO CLIENTE


const registroclienti = require('../model/clientiModel.js');


router.post("/frontendregister", function(req, res){
    
      try{  

        let newUser = new registroclienti({
            nome: req.body.nome,
            cognome: req.body.cognome,
            username: req.body.username,
            password: Bcrypt.hashSync(req.body.password, 10),
            citta: req.body.citta,
            via: req.body.via,
            punti: "10"    
    });

    registroclienti.findOne({'username' : req.body.username})
    .then(function (result) {
      
        if (null != result) {
        res.redirect('/docs/frontend');
        //console.log("USERNAME ALREADY EXISTS:", result.username);
      }
      else  {
        newUser.save();
        res.redirect('/docs/frontend');	 
        //console.log("CREATING USER:", result.username);  
      }       
    });
      }catch(error){

        res.status(500).send(error);
    }
},
);


/*
router.post("/frontendregister", function(req, res){
    try{
            
        let newUser = new registroclienti({
            nome: req.body.nome,
            cognome: req.body.cognome,
            username: req.body.username,
            password: Bcrypt.hashSync(req.body.password, 10),
            citta: req.body.citta,
            via: req.body.via,
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
*/

//                      REGISTRAZIONE NUOVO OGGETTO


const oggetto = require('../model/objectModel.js');


router.post("/objectregister", function(req, res){
    const idUnique = Math.floor(100000 + Math.random() * 900000);
    try{
        let newObject = new oggetto({
            game: req.body.game,
            platform: req.body.platform,
            annoUscita: req.body.annoUscita,
            stato: req.body.stato,
            condizioni: req.body.condizioni,
            etaMinima: req.body.etaMinima,
            peso: req.body.peso,
            numGiocatori: req.body.numGiocatori,
            prezzo: req.body.prezzo,
            quantita: req.body.quantita,
            img: req.body.img,   
            disponibile: req.body.disponibile,
            id: idUnique
    });
        newObject.save();
        res.redirect('/user/backendlogged');	
        
    }
    catch(error){
        res.status(500).send(error);
    }
},
);


//                      REGISTRAZIONE NUOVO NOLEGGIO


const noleggio = require('../model/noleggioModel.js');


router.post("/noleggioregister", function(req, res){
    
    try{
        let newRent = new noleggio({
            usernameCliente: req.body.usernameCliente,
            titoloNoleggiato: req.body.titoloNoleggiato,
            piattaforma: req.body.piattaforma,
            usernameFunzionario: req.body.usernameFunzionario,
            inizioNoleggio: req.body.inizioNoleggio,
            fineNoleggio: req.body.fineNoleggio,
            prezzoTotale: req.body.prezzoTotale,
            stato: req.body.stato
            
    });
        newRent.save();
        res.redirect('/user/backendlogged');	
        
    }
    catch(error){
        res.status(500).send(error);
    }
},
);





module.exports = router;




