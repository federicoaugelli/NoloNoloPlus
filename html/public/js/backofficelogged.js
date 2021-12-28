/*
function tableCustomer(d){

    document.getElementsById("anagraficaClientibody").innerHTML = "";
    usernameSet.clear();
    usernamearray = [];

    for(let i in d.result){

        let idCliente = d.result[i]._id;
        let nome = d.result[i].nome.toLowerCase();
        let cognome = d.result[i].cognome.toLowerCase();
        let username = d.result[i].username;
        let indirizzo = d.result[i].indirizzo;
        let punti = d.result[i].punti;
        
        usernameSet.add(username.toLowerCase());
        let tbody = document.getElementsById("anagraficaClientibody");
        const tr = document.createElement("tr");
        tr.innerHTML =
        '<th scope = "row" style="text-transform: capitalize" class="titleRowCustomer">' +
        nome + 
        ' ' +
        cognome +
        '<th>'
        '<td class = "tdCustomer"' +
        username +
        '</td>'
        '<td class = "tdCustomer"' +
        indirizzo +
        '</td>'
        '<td class = "tdCustomer"' +
        punti +
        '</td>'
        '<td class = "tdCustomer" style="display:none"' +
        idCliente +
        '</td>'
        '<td class="tdCustomer"><button data-bs-toggle="modal" data-bs-target="#modUserModal" class="btn btn-secondary"></td>'
        tbody.appendChild(tr);
    }
}


function modUser(){

    var formData = $("#modUserForm").serializeArray();

    if(
        formData[0].value != "" &&
        formData[1].value != "" &&
        formData[2].value != "" &&
        formData[3].value != "" &&
        formData[4].value != ""        
    ){
        $.ajax({

            url:"/db/update"
        })


     }
}

*/


const express = require('express');
const router = express.Router();
const Bcrypt = require("bcryptjs");


//                      REGISTRAZIONE NUOVO CLIENTE IN MONGO


const registroclienti = require('../model/clientiModel.js');
const { db } = require('../../app/model/clientiModel');


router.get("/vediUtenti", function(req, res){
    try{
        const userList = db.getCollection();
    
    }
    catch(error){
        res.status(500).send(error);
    }
},
);



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




