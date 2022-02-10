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



//                      REGISTRAZIONE JSON DIPENDENTI 



const registrodipendenti = require('../model/dipendentiModel.js');

var dipendentiData = require('../../public/data/dipendenti.json');
//var registrodipendenti = mongoose.model( 'registrodipendenti' );



router.post("/backendregister", function(req, res){

      //mongoose.deleteModel("registrodipendenti");
       //mongoose.model(registrodipendenti).deleteMany();

        for(var i = 0; i < dipendentiData.length; i++) {

            new registrodipendenti(dipendentiData[i]).save();
        }
        res.redirect('/docs/create.html');
},
);



//                      REGISTRAZIONE NUOVO OGGETTO


const oggetto = require('../model/objectModel.js');


router.post("/objectregister", function(req, res){
  
    try{
        let newObject = new oggetto({

            img: req.body.img,
            game: req.body.game,
            platform: req.body.platform,
            annoUscita: req.body.annoUscita,
            stato: req.body.stato,
            condizioni: req.body.condizioni,
            etaMinima: req.body.etaMinima,
            peso: req.body.peso,
            numGiocatori: req.body.numGiocatori,
            prezzo: req.body.prezzo,
            disponibile: "",
            dataIndisponibilita: ""
            
    });
        newObject.save();
        res.redirect('/user/backendlogged');	
        
    }
    catch(error){
        res.status(500).send(error);
    }
},
);


//                      REGISTRAZIONE NUOVO NOLEGGIO BACKEND


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
            stato: req.body.stato,
            commenti: req.body.commenti,
            costoGiorno: req.body.costoGiorno,
            idGioco: req.body.idGioco
    });
        newRent.save();
        res.redirect('/user/backendlogged');	
        
    }
    catch(error){
        res.status(500).send(error);
    }
},
);

//                      REGISTRAZIONE NUOVO NOLEGGIO FRONTEND

router.post("/createnoleggio", function(req, res){
    console.log(req.body);
    let yourDate = new Date().toISOString().split('T')[0];
    let state = '';
    if(yourDate == req.body.inizioNoleggio){
        state = 'attivo';
    }
    else{
        state = 'futuro';
    }

    try{
        let newRent = new noleggio({
            usernameCliente: req.body.usernameCliente,
            titoloNoleggiato: req.body.titoloNoleggiato,
            piattaforma: req.body.piattaforma,
            usernameFunzionario: '',
            inizioNoleggio: req.body.inizioNoleggio,
            fineNoleggio: req.body.fineNoleggio,
            prezzoTotale: req.body.prezzoTotale,
            stato: state,
            commenti: '',
            costoGiorno: req.body.costoGiorno,
            idGioco: req.body.idGioco

            
    });
        newRent.save();
        res.redirect('/user/frontendlogged');    
        
    }
    catch(error){
        res.status(500).send(error);
    }
},
);





module.exports = router;




