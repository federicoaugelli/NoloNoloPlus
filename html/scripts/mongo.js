﻿/*
File: mongo.js
Author: Fabio Vitali
Version: 1.0 
Last change on: 10 April 2021


Copyright (c) 2021 by Fabio Vitali

   Permission to use, copy, modify, and/or distribute this software for any
   purpose with or without fee is hereby granted, provided that the above
   copyright notice and this permission notice appear in all copies.

   THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
   WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
   MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY
   SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
   WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION
   OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN
   CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

*/

let fn = "/public/data/dipendenti.json"
//let fn = "/public/data/oggetti.json"
//let fn = "/public/data/noleggi.json"
let dbname = "site202127"
let collection ="registrodipendenti"
let fieldname = "persone"
let collection1 = "registroclienti"
let collection2 = "oggetti"
let collection3 = "noleggi"

const { MongoClient } = require("mongodb");
const fs = require('fs').promises;
const template = require(global.rootDir + '/scripts/tpl.js');
const Bcrypt = require("bcryptjs"); 


     const mongouri = "mongodb://127.0.0.1:27017";
    //const mongouri = `mongodb://${credentials.user}:${credentials.pwd}@${credentials.site}?writeConcern=majority`;

MongoClient.connect(mongouri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, client) => {
    if (err) {
        return console.log(err);
    }
    // Specify database you want to access
    console.log(`MongoDB Connected: ${mongouri} to dbname: ${dbname}`);
});


//                                                              registrare un nuovo cliente
exports.registerCliente = async function(newUser,credentials) {
	
	//const mongouri = `mongodb://${credentials.user}:${credentials.pwd}@${credentials.site}?writeConcern=majority`;
	let data = { result: null };
	let debug = [];
	try{

		debug.push('trying to connect MongoDB');
		const mongo = new MongoClient(mongouri);
		await mongo.connect();
		debug.push("Managed to close connection to MongoDB.");
		
        let doc = {
				
			nome: newUser[0].value,
			cognome: newUser[1].value,
			username: newUser[2].value,
			password: Bcrypt.hashSync(newUser[3].value, 10),
			via: newUser[4].value,
			citta: newUser[5].value,
			punti: 10
		};

		    await mongo
		        .db(dbname)
			    .collection(collection1)
				.insertOne(doc)
				.forEach((r) => {
					result.push(r);
				});
		
				data.result = result;

	    await mongo.close();
		debug.push("Managed to close connection to MongoDB.");
		return data;
	}
	catch(e){

		return e;
	}
};

//                                                              registrare un nuovo oggetto nell'inventario
exports.registerObject = async function(newObject,credentials) {
	
	//const mongouri = `mongodb://${credentials.user}:${credentials.pwd}@${credentials.site}?writeConcern=majority`;
	
	let data = { result: null };
	let debug = [];
	try{

		debug.push('trying to connect MongoDB');
		const mongo = new MongoClient(mongouri);
		await mongo.connect();
		debug.push("Managed to close connection to MongoDB.");
		
        let doc = {
				
			img: newObject[0].value,
			game: newObject[1].value,
			platform: newObject[2].value,
			annoUscita: newObject[3].value,
			stato: newObject[4].value,
			condizioni: newObject[5].value,
			etaMinima: newObject[6].value,
			peso: newObject[7].value,
			numGiocatori: newObject[8].value,
			prezzo: newObject[9].value,
			dataIndisponibilita: "",
			disponibile: "true"
		};

		    await mongo
		        .db(dbname)
			    .collection(collection2)
				.insertOne(doc)
				.forEach((r) => {
					result.push(r);
				});
		
				data.result = result;

	    await mongo.close();
		debug.push("Managed to close connection to MongoDB.");
		return data;
	}
	catch(e){

		return e;
	}
};



//                                                              registrare un nuovo noleggio
exports.registerNoleggio = async function(newNoleggio,credentials) {
	
	//const mongouri = `mongodb://${credentials.user}:${credentials.pwd}@${credentials.site}?writeConcern=majority`;
	let data = { result: null };
	let debug = [];
	try{

		debug.push('trying to connect MongoDB');
		const mongo = new MongoClient(mongouri);
		await mongo.connect();
		debug.push("Managed to close connection to MongoDB.");
		
        let doc = {
						
			usernameFunzionario:newNoleggio[0].value,
			titoloNoleggiato:newNoleggio[1].value,
			piattaforma: newNoleggio[2].value,
			usernameCliente: newNoleggio[3].value,
			inizioNoleggio: newNoleggio[4].value,
			fineNoleggio: newNoleggio[5].value,
			costoGiorno: newNoleggio[6].value,
			prezzoTotale: newNoleggio[8].value,
			stato: newNoleggio[9].value,
			commenti: newNoleggio[10].value,
			
		};

		    await mongo
		        .db(dbname)
			    .collection(collection3)
				.insertOne(doc)
				.forEach((r) => {
					result.push(r);
				});
		
				data.result = result;

	    await mongo.close();
		debug.push("Managed to close connection to MongoDB.");
		return data;
	}
	catch(e){

		return e;
	}
};

exports.registerNoleggioClient = async function(newNoleggio,credentials) {

	let yourDate = new Date().toISOString().split('T')[0];
    let state = '';
    if(yourDate == newNoleggio[7].value){
        state = 'in corso';
    }
    else{
        state = 'futuro';
    }

    console.log(newNoleggio);
	
	//const mongouri = `mongodb://${credentials.user}:${credentials.pwd}@${credentials.site}?writeConcern=majority`;
	let data = { result: null };
	let debug = [];
	try{

		debug.push('trying to connect MongoDB');
		const mongo = new MongoClient(mongouri);
		await mongo.connect();
		debug.push("Managed to close connection to MongoDB.");
		
        let doc = {
						
			usernameFunzionario: '',
			titoloNoleggiato: newNoleggio[1].value,
			piattaforma: newNoleggio[2].value,
			usernameCliente: newNoleggio[0].value,
			inizioNoleggio: newNoleggio[7].value,
			fineNoleggio: newNoleggio[8].value,
			costoGiorno: newNoleggio[4].value,
			prezzoTotale: newNoleggio[3].value,
			stato: state,
			commenti: '',
			idGioco: newNoleggio[6].value
			
		};

		console.log(doc);

		    await mongo
		        .db(dbname)
			    .collection(collection3)
				.insertOne(doc)
				.forEach((r) => {
					result.push(r);
				});
		
				data.result = result;

	    await mongo.close();
		debug.push("Managed to close connection to MongoDB.");
		return data;
	}
	catch(e){

		return e;
	}
};


exports.create = async function(credentials) {
	
	//const mongouri = `mongodb://${credentials.user}:${credentials.pwd}@${credentials.site}?writeConcern=majority`;
	
	let debug = []
	try {
		debug.push(`Trying to connect to MongoDB with user: '${credentials.user}' and site: '${credentials.site}' and a ${credentials.pwd.length}-character long password...`)
		const mongo = new MongoClient(mongouri);	
		await mongo.connect();
		debug.push("... managed to connect to MongoDB.")

		debug.push(`Trying to read file '${fn}'... `)
		//let doc = await fs.readFile('C:/Users/matte/Documents/GitHub/site202127/html/public/data/dipendenti.json', 'utf8')
		//let doc = await fs.readFile('/Users/frederick/Documents/IT/Web Programming/site202127/html/public/data/oggetti.json', 'utf8')
		let doc = await fs.readFile(global.rootDir + fn, 'utf8')
		let data = JSON.parse(doc)
		debug.push(`... read ${data.length} records successfully. `)

		debug.push(`Trying to remove all records in table '${dbname}'... `)
		let cleared = await mongo.db(dbname)
					.collection(collection)
					.deleteMany()
		debug.push(`... ${cleared?.deletedCount || 0 } records deleted.`)
					
		debug.push(`Trying to add ${data.length} new records... `)
		let added = await mongo.db(dbname)
					.collection(collection)
		 			.insertMany(data)	
		debug.push(`... ${added?.insertedCount || 0} records added.`)

		await mongo.close();
		debug.push("Managed to close connection to MongoDB.")

		return {
			message: `<h1>Removed ${cleared?.deletedCount || 0} records, added ${added?.insertedCount || 0} records</h1>`, 
			debug: debug
		}
	} catch (e) {
		e.debug = debug
		return e
	}
}


exports.search = async function(q,credentials) {
	
	//const mongouri = `mongodb://${credentials.user}:${credentials.pwd}@${credentials.site}?writeConcern=majority`;

	let query =  {}
	let debug = []
	let data = {query: q[fieldname], result: null}
	try {
		debug.push(`Trying to connect to MongoDB with user: '${credentials.user}' and site: '${credentials.site}' and a ${credentials.pwd.length}-character long password...`)
		const mongo = new MongoClient(mongouri);		
		await mongo.connect();
		debug.push("... managed to connect to MongoDB.")

		debug.push(`Trying to query MongoDB with query '${q[fieldname]}'... `)
		let result = []
		query[fieldname] = { $regex: q[fieldname], $options: 'i' }
		await mongo.db(dbname)
					.collection(collection)
					.find(query)
					.forEach( (r) => { 
						result.push(r) 
					} );
		debug.push(`... managed to query MongoDB. Found ${result.length} results.`)

		data.result = result
		await mongo.close();
		debug.push("Managed to close connection to MongoDB.")

		data.debug = debug
		if (q.ajax) {
			return data
		} else {
			var out = await template.generate('mongo.html', data);
			return out
		}
	} catch (e) {
		data.debug = debug
		data.error = e
		return data
	}
}


exports.deleteDipendentiCollection = async function(credentials){

	//const mongouri = `mongodb://${credentials.user}:${credentials.pwd}@${credentials.site}?writeConcern=majority`;
	//console.log(oldObject);
	let debug = [];
	try{

		debug.push('trying to connect MongoDB');
		const mongo = new MongoClient(mongouri);
		await mongo.connect();
		debug.push("Managed to close connection to MongoDB.");
		
		    await mongo
		        .db(dbname)
			    .collection(collection1)
				.deleteMany()

	    await mongo.close();
		debug.push("Managed to close connection to MongoDB.");
	}
	catch(e){

		return e;
	}
  };


exports.getGames = async function (credentials) {

	//const mongouri = `mongodb://${credentials.user}:${credentials.pwd}@${credentials.site}?writeConcern=majority`;


	//let debug = [];
	let data = { result: null };
	try{
		const mongo = new MongoClient(mongouri);
		await mongo.connect();
		let result = [];
		await mongo
		.db(dbname)
		.collection(collection2)
		.find()
		.sort({ game: 1 })
		.forEach((r) => {
			result.push(r);
		});

		data.result = result;

		await mongo.close();

		return data;
	}

	catch (e) {
		return data;
	}
};



exports.getDipendenti = async function (credentials) {

	//const mongouri = `mongodb://${credentials.user}:${credentials.pwd}@${credentials.site}?writeConcern=majority`;


	//let debug = [];
	let data = { result: null };
	try{
		const mongo = new MongoClient(mongouri);
		await mongo.connect();
		let result = [];
		await mongo
		.db(dbname)
		.collection(collection)
		.find()
		.sort({ username: 1 })
		.forEach((r) => {
			result.push(r);
		});

		data.result = result;

		await mongo.close();
		console.log(result)

		return data;
	}

	catch (e) {
		return data;
	}
};



//get noleggi
exports.getUserItems = async function (credentials) {

	//const mongouri = `mongodb://${credentials.user}:${credentials.pwd}@${credentials.site}?writeConcern=majority`;

	//let debug = [];
	let data = { result: null };
	try{
		const mongo = new MongoClient(mongouri);
		await mongo.connect();
		let result = [];
		await mongo
		.db(dbname)
		.collection(collection3)
		.find()
		.sort({ titoloNoleggiato: 1 })
		.forEach((r) => {
			result.push(r);
		});

		data.result = result;

		await mongo.close();

		return data;
	}

	catch (e) {
		return data;
	}
};



exports.findClienti = async function (credentials) {
	
	//const mongouri = `mongodb://${credentials.user}:${credentials.pwd}@${credentials.site}?writeConcern=majority`;
  
	let debug = [];
	let data = { result: null };
	try {
		debug.push(`Trying to connect to MongoDB`);
		//console.log(debug)
		const mongo = new MongoClient(mongouri);
		await mongo.connect();
		let result = [];
		debug.push("... managed to connect to MongoDB.");
		//console.log(debug)
		await mongo
		.db(dbname)
		.collection(collection1)
		.find()
		.sort({ username: 1 })
		.forEach((r) => {
		  result.push(r);
		});
  
	  	data.result = result;
  
	  	await mongo.close();
  
	  	debug.push("Managed to close connection to MongoDB.");
	  	return data;
	} 

	catch (e) {
		return e;
	}
};


  
  exports.getNoleggiUser = async function (userCliente) {
	
	//const mongouri = `mongodb://${credentials.user}:${credentials.pwd}@${credentials.site}?writeConcern=majority`;
  
	let debug = [];
	let data = { result: null };
	try {
	  debug.push(`Trying to connect to MongoDB`);
	  console.log(debug)
	  const mongo = new MongoClient(mongouri);
	  await mongo.connect();
	  let result = [];
	  debug.push("... managed to connect to MongoDB.");
	  //console.log(debug)
	  var myquery = {
		usernameCliente: userCliente		
	};

	  await mongo
		.db(dbname)
		.collection(collection3)
		.find(myquery)
		.forEach((r) => {
		  result.push(r);
		});
  
	  data.result = result;
  
	  await mongo.close();
  
	  debug.push("Managed to close connection to MongoDB.");
	  return data;
	} catch (e) {
	  return e;
	}
  };


  
exports.getNoleggi = async function (credentials) {
	
	//const mongouri = `mongodb://${credentials.user}:${credentials.pwd}@${credentials.site}?writeConcern=majority`;
  
	let debug = [];
	let data = { result: null };
	try {
	  debug.push(`Trying to connect to MongoDB`);
	  console.log(debug)
	  const mongo = new MongoClient(mongouri);
	  await mongo.connect();
	  let result = [];
	  debug.push("... managed to connect to MongoDB.");
	  //console.log(debug)
	  await mongo
		.db(dbname)
		.collection(collection3)
		.find()
		.sort({ usernameCliente: 1 })
		.forEach((r) => {
		  result.push(r);
		});
  
	  data.result = result;
  
	  await mongo.close();
  
	  debug.push("Managed to close connection to MongoDB.");
	  return data;
	} catch (e) {
	  return data;
	}
  };



   
exports.getNoleggiTerminati = async function (credentials) {
	
	//const mongouri = `mongodb://${credentials.user}:${credentials.pwd}@${credentials.site}?writeConcern=majority`;
  
	let debug = [];
	let data = { result: null };
	try {
	  debug.push(`Trying to connect to MongoDB`);
	  console.log(debug)
	  const mongo = new MongoClient(mongouri);
	  await mongo.connect();
	  let result = [];
	  debug.push("... managed to connect to MongoDB.");
	  //console.log(debug)
	  await mongo
		.db(dbname)
		.collection(collection3)
		.find({stato : "concluso"})
		.sort({ usernameCliente: 1 })
		.forEach((r) => {
		  result.push(r);
		});
  
	  data.result = result;
  
	  await mongo.close();
  
	  debug.push("Managed to close connection to MongoDB.");
	  return data;
	} catch (e) {
	  return data;
	}
  };



   
exports.getNoleggiAttivi = async function (credentials) {
	
	//const mongouri = `mongodb://${credentials.user}:${credentials.pwd}@${credentials.site}?writeConcern=majority`;
  
	let debug = [];
	let data = { result: null };
	try {
	  debug.push(`Trying to connect to MongoDB`);
	  console.log(debug)
	  const mongo = new MongoClient(mongouri);
	  await mongo.connect();
	  let result = [];
	  debug.push("... managed to connect to MongoDB.");
	  //console.log(debug)
	  await mongo
		.db(dbname)
		.collection(collection3)
		//.find({stato : "attivo" ,stato: "futuro"})
		.find({stato: "attivo"})
		.sort({ usernameCliente: 1 })
		.forEach((r) => {
		  result.push(r);
		});
  
	  data.result = result;
  
	  await mongo.close();
  
	  debug.push("Managed to close connection to MongoDB.");
	  return data;
	} catch (e) {
	  return data;
	}
  };


    
exports.getNoleggiFuturi = async function (credentials) {
	
	//const mongouri = `mongodb://${credentials.user}:${credentials.pwd}@${credentials.site}?writeConcern=majority`;
  
	let debug = [];
	let data = { result: null };
	try {
	  debug.push(`Trying to connect to MongoDB`);
	  console.log(debug)
	  const mongo = new MongoClient(mongouri);
	  await mongo.connect();
	  let result = [];
	  debug.push("... managed to connect to MongoDB.");
	  //console.log(debug)
	  await mongo
		.db(dbname)
		.collection(collection3)
		//.find({stato : "attivo" ,stato: "futuro"})
		.find({stato: "futuro"})
		.sort({ usernameCliente: 1 })
		.forEach((r) => {
		  result.push(r);
		});
  
	  data.result = result;
  
	  await mongo.close();
  
	  debug.push("Managed to close connection to MongoDB.");
	  return data;
	} catch (e) {
	  return data;
	}
  };



//modifica oggetto nel database
exports.updateNoleggioFuturo = async function(oldNoleggio, newNoleggio, credentials){

	//const mongouri = `mongodb://${credentials.user}:${credentials.pwd}@${credentials.site}?writeConcern=majority`;

	let debug = [];
    try{

		debug.push('trying to connect MongoDB');
		const mongo = new MongoClient(mongouri);
		await mongo.connect();
		debug.push("Managed to close connection to MongoDB.");
		let ObjectId = require('mongodb').ObjectId;
		var myquery = {

			_id: ObjectId(oldNoleggio)			
		};

		var newValues = {
			$set:{

			inizioNoleggio: newNoleggio[3].value,	
			fineNoleggio: newNoleggio[4].value,
			prezzoTotale: newNoleggio[6].value,
			stato: newNoleggio[7].value,
			commenti: newNoleggio[8].value
		},
	};
	let updated = mongo
	                .db(dbname)
					.collection(collection3)
					.updateOne(myquery, newValues);
	
	let updatedFlag = false
	if(updated.result.ok > 0) {

		updatedFlag = true
		
	}
	debug.push("Managed to close connection to MongoDB.");
	await mongo.close();
	return(updatedFlag);
    }
	catch(e){

		return e;
	}  
  }


  exports.updateNoleggioDopoModificaUsername = async function(oldUsername, userCliente, credentials){

	//const mongouri = `mongodb://${credentials.user}:${credentials.pwd}@${credentials.site}?writeConcern=majority`;

	let debug = [];
    try{

		debug.push('trying to connect MongoDB');
		const mongo = new MongoClient(mongouri);
		await mongo.connect();
		debug.push("Managed to close connection to MongoDB.");

		var myquery = {

			usernameCliente: oldUsername		
		};

		var newValues = {
			$set:{

			usernameCliente: userCliente
			}
	};
	let updated = mongo
	                .db(dbname)
					.collection(collection3)
					.updateMany(myquery, newValues);
	
	let updatedFlag = false
	if(updated.result.ok > 0) {

		updatedFlag = true
		
	}
	debug.push("Managed to close connection to MongoDB.");
	await mongo.close();
	return(updatedFlag);
    }
	catch(e){

		return e;
	}  
  }




//modifica utente
  exports.updateUser = async function(oldUser, newUser, credentials){

	//const mongouri = `mongodb://${credentials.user}:${credentials.pwd}@${credentials.site}?writeConcern=majority`;
	let debug = [];
    try{
    	console.log(oldUser, newUser);
		debug.push('trying to connect MongoDB');
		const mongo = new MongoClient(mongouri);
		await mongo.connect();
		debug.push("Managed to close connection to MongoDB.");
		let ObjectId = require('mongodb').ObjectId;
		var myquery = {

			_id: ObjectId(oldUser)
			
		};

		var newValues = {
			$set:{

			nome: newUser[0].value,
			cognome: newUser[1].value,
			username: newUser[2].value,
			citta: newUser[3].value,
			via: newUser[4].value,
			punti: newUser[5].value
		},
	};
	let updated = mongo
	                .db(dbname)
					.collection(collection1)
					.updateOne(myquery, newValues);
	
	let updatedFlag = false
	if(updated.result.ok > 0) {

		updatedFlag = true
		
	}
	debug.push("Managed to close connection to MongoDB.");
	await mongo.close();
	return(updatedFlag);
    }
	catch(e){

		return e;
	}  
  };



//modifica oggetto nel database
exports.updateObject = async function(oldObject, newObject, credentials){

	//const mongouri = `mongodb://${credentials.user}:${credentials.pwd}@${credentials.site}?writeConcern=majority`;

	let debug = [];
    try{

		debug.push('trying to connect MongoDB');
		const mongo = new MongoClient(mongouri);
		await mongo.connect();
		debug.push("Managed to close connection to MongoDB.");
		let ObjectId = require('mongodb').ObjectId;
		var myquery = {

			_id: ObjectId(oldObject)
			
		};

		var newValues = {

			$set:{

			img: newObject[0].value,
			game: newObject[1].value,
			platform: newObject[2].value,
			annoUscita: newObject[3].value,
			stato: newObject[4].value,
			condizioni: newObject[5].value,
			etaMinima: newObject[6].value,
			peso: newObject[7].value,
			numGiocatori: newObject[8].value,
			prezzo: newObject[9].value,
			disponibile: newObject[10].value,
			dataIndisponibilita: newObject[11].value,
			
				
		},
	};
	let updated = mongo
	                .db(dbname)
					.collection(collection2)
					.updateOne(myquery, newValues);
	
	let updatedFlag = false
	if(updated.result.ok > 0) {

		updatedFlag = true
		
	}
	debug.push("Managed to close connection to MongoDB.");
	await mongo.close();
	return(updatedFlag);
    }
	catch(e){

		return e;
	}  
  };



//update Cliente
  exports.updateClient = async function(oldUser, newUser, credentials){

	//const mongouri = `mongodb://${credentials.user}:${credentials.pwd}@${credentials.site}?writeConcern=majority`;
	let debug = [];
    try{
    	console.log(oldUser, newUser);
		debug.push('trying to connect MongoDB');
		const mongo = new MongoClient(mongouri);
		await mongo.connect();
		debug.push("Managed to close connection to MongoDB.");
		let ObjectId = require('mongodb').ObjectId;
		var myquery = {

			_id: ObjectId(oldUser)
			
		};

		var newValues = {
			$set:{
			nome: newUser[0].value,
			cognome: newUser[1].value,
			username: newUser[2].value,
			password: Bcrypt.hashSync(newUser[3].value, 10), //newUser[3].value,
			citta: newUser[4].value,
			via: newUser[5].value,
		},
	};
	let updated = mongo
	                .db(dbname)
					.collection(collection1)
					.updateOne(myquery, newValues);
	
	let updatedFlag = false
	if(updated.result.ok > 0) {

		updatedFlag = true
		
	}
	debug.push("Managed to close connection to MongoDB.");
	await mongo.close();
	return(updatedFlag);
    }
	catch(e){

		return e;
	}  
  };





  //modifica oggetto nel database
  exports.updatePuntiCliente = async function(user, puntiRimasti, credentials){

	//const mongouri = `mongodb://${credentials.user}:${credentials.pwd}@${credentials.site}?writeConcern=majority`;

	let debug = [];
    try{

		debug.push('trying to connect MongoDB');
		const mongo = new MongoClient(mongouri);
		await mongo.connect();
		debug.push("Managed to close connection to MongoDB.");
		var myquery = {

			username: user
		};

		var newValues = {
			$set:{

			punti: puntiRimasti			
		},
	};
	let updated = mongo
	                .db(dbname)
					.collection(collection1)
					.updateOne(myquery, newValues);
	
	let updatedFlag = false
	if(updated.result.ok > 0) {

		updatedFlag = true
		
	}
	debug.push("Managed to close connection to MongoDB.");
	await mongo.close();
	return(updatedFlag);
    }
	catch(e){

		return e;
	}  
  };

//Aggiorna i punti cliente di 10
  exports.updatePuntiClientSide = async function(user, points, credentials){

	//const mongouri = `mongodb://${credentials.user}:${credentials.pwd}@${credentials.site}?writeConcern=majority`;


  	points = parseInt(points) + 10;

	let debug = [];
    try{

		debug.push('trying to connect MongoDB');
		const mongo = new MongoClient(mongouri);
		await mongo.connect();
		debug.push("Managed to close connection to MongoDB.");
		var myquery = {

			username: user
		};

		var newValues = {
			$set:{

			punti: points		
		},
	};
	let updated = mongo
	                .db(dbname)
					.collection(collection1)
					.updateOne(myquery, newValues);
	
	let updatedFlag = false
	if(updated.result.ok > 0) {

		updatedFlag = true
		
	}
	debug.push("Managed to close connection to MongoDB.");
	await mongo.close();
	return(updatedFlag);
    }
	catch(e){

		return e;
	}  
  };

//Decrementa i punti cliente di 10
  exports.decreasePuntiClientSide = async function(user, points, credentials){

	//const mongouri = `mongodb://${credentials.user}:${credentials.pwd}@${credentials.site}?writeConcern=majority`;


  	points = parseInt(points) - 10;
  	
	let debug = [];
    try{

		debug.push('trying to connect MongoDB');
		const mongo = new MongoClient(mongouri);
		await mongo.connect();
		debug.push("Managed to close connection to MongoDB.");
		var myquery = {

			username: user
		};

		var newValues = {
			$set:{

			punti: points		
		},
	};
	let updated = mongo
	                .db(dbname)
					.collection(collection1)
					.updateOne(myquery, newValues);
	
	let updatedFlag = false
	if(updated.result.ok > 0) {

		updatedFlag = true
		
	}
	debug.push("Managed to close connection to MongoDB.");
	await mongo.close();
	return(updatedFlag);
    }
	catch(e){

		return e;
	}  
  };
/*
exports.createLease = async function(newLease, credentials) {
	
	let debug = []
	try {
		debug.push('trying to connect MongoDB');
		const mongo = new MongoClient(mongouri);		
		await mongo.connect();
		debug.push("... managed to connect to MongoDB.")

		let added = await mongo.db(dbname)
					.collection(collection3)
		 			.insertOne(newLease);

		await mongo.close();
		debug.push("Managed to close connection to MongoDB.")

		return {
			debug: debug
		}
	} catch (e) {
		e.debug = debug
		return e
	}
} 
*/

//modifica noleggio
  exports.updateLease = async function(oldObject, newObject, credentials){

	//const mongouri = `mongodb://${credentials.user}:${credentials.pwd}@${credentials.site}?writeConcern=majority`;

	let debug = [];
    try{

		debug.push('trying to connect MongoDB');
		const mongo = new MongoClient(mongouri);
		await mongo.connect();
		debug.push("Managed to close connection to MongoDB.");
		let ObjectId = require('mongodb').ObjectId;
		var myquery = {

			_id: ObjectId(oldObject)
			
		};

		var newValues = {
			$set:{

			usernameCliente: newObject[0].value,	
			titoloNoleggiato: newObject[1].value,
			usernameFunzionario: newObject[2].value,
			inizioNoleggio: newObject[3].value,
			fineNoleggio: newObject[4].value,
			prezzoTotale: newObject[5].value,
			stato: newObject[6].value
			
		},
	};
	let updated = mongo
	                .db(dbname)
					.collection(collection3)
					.updateOne(myquery, newValues);
	
	let updatedFlag = false
	if(updated.result.ok > 0) {

		updatedFlag = true
		
	}
	debug.push("Managed to close connection to MongoDB.");
	await mongo.close();
	return(updatedFlag);
    }
	catch(e){

		return e;
	}  
  };


//elimina noleggio dal database
   exports.deleteLease = async function(oldObject, credentials){

	//const mongouri = `mongodb://${credentials.user}:${credentials.pwd}@${credentials.site}?writeConcern=majority`;
	console.log(oldObject);
	let debug = [];
	try{

		debug.push('trying to connect MongoDB');
		const mongo = new MongoClient(mongouri);
		await mongo.connect();
		debug.push("Managed to close connection to MongoDB.");
		let ObjectId = require('mongodb').ObjectId;
		var myquery = {

			_id: ObjectId(oldObject)
		};
		let removed = await mongo
		                .db(dbname)
						.collection(collection3)
						.deleteOne(myquery)
	    await mongo.close();
		debug.push("Managed to close connection to MongoDB.");
	}
	catch(e){

		return e;
	}
  };


  
//elimina utente dal database
  exports.deleteUser = async function(oldUser, credentials){

	//const mongouri = `mongodb://${credentials.user}:${credentials.pwd}@${credentials.site}?writeConcern=majority`;

	let debug = [];
	try{

		debug.push('trying to connect MongoDB');
		const mongo = new MongoClient(mongouri);
		await mongo.connect();
		debug.push("Managed to close connection to MongoDB.");
		let ObjectId = require('mongodb').ObjectId;
		var myquery = {

			_id: ObjectId(oldUser)
		};
		let removed = await mongo
		                .db(dbname)
						.collection(collection1)
						.deleteOne(myquery)
	    await mongo.close();
		debug.push("Managed to close connection to MongoDB.");
	}
	catch(e){

		return e;
	}
  };


  
//elimina utente dal database
exports.deleteNoleggioFuturo = async function(oldNoleggio, credentials){

	//const mongouri = `mongodb://${credentials.user}:${credentials.pwd}@${credentials.site}?writeConcern=majority`;

	let debug = [];
	try{

		debug.push('trying to connect MongoDB');
		const mongo = new MongoClient(mongouri);
		await mongo.connect();
		debug.push("Managed to close connection to MongoDB.");
		let ObjectId = require('mongodb').ObjectId;
		var myquery = {

			_id: ObjectId(oldNoleggio)
		};
		let removed = await mongo
		                .db(dbname)
						.collection(collection3)
						.deleteOne(myquery)
	    await mongo.close();
		debug.push("Managed to close connection to MongoDB.");
	}
	catch(e){

		return e;
	}
  };



//elimina oggetto dal database
  exports.deleteObject = async function(oldObject, credentials){

	//const mongouri = `mongodb://${credentials.user}:${credentials.pwd}@${credentials.site}?writeConcern=majority`;

	let debug = [];
	try{

		debug.push('trying to connect MongoDB');
		const mongo = new MongoClient(mongouri);
		await mongo.connect();
		debug.push("Managed to close connection to MongoDB.");
		let ObjectId = require('mongodb').ObjectId;
		var myquery = {

			_id: ObjectId(oldObject)
		};
		let removed = await mongo
		                .db(dbname)
						.collection(collection2)
						.deleteOne(myquery)
	    await mongo.close();
		debug.push("Managed to close connection to MongoDB.");
	}
	catch(e){

		return e;
	}
  };

//funzione backend per aggiornare stato dei noleggi???

  
  


/* Untested */
// https://stackoverflow.com/questions/39599063/check-if-mongodb-is-connected/39602781


exports.isConnected = async function() {

	//const mongouri = `mongodb://${credentials.user}:${credentials.pwd}@${credentials.site}?writeConcern=majority`;

	
	let client = await MongoClient.connect(mongouri);
	return !!client && !!client.topology && client.topology.isConnected()	
}




