/*
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
let dbname = "site202127"
let collection ="registrodipendenti"
let fieldname = "persone"
let collection1 = "registroclienti"
let collection2 = "oggetti"

const { MongoClient } = require("mongodb");
const fs = require('fs').promises ;
const template = require(global.rootDir + '/scripts/tpl.js') ; 



     //const mongouri = "mongodb://127.0.0.1:27017";
     const mongouri = `mongodb://${credentials.user}:${credentials.pwd}@${credentials.site}?writeConcern=majority`;

MongoClient.connect(mongouri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, client) => {
    if (err) {
        return console.log(err);
    }
    // Specify database you want to access
    console.log(`MongoDB Connected: ${mongouri} to dbname: ${dbname} and collection: ${collection}`);
});


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
		 			.insertMany(data);	
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

exports.createObject = async function(newObject){

     //const mongouri = "mongodb://127.0.0.1:27017?writeConern=majority";
	 console.log(newObject);
	 let debug = [];
	 try{

		debug.push("tryng to connect to MongoDB");
		const mongo = new MongoClient(mongouri);
		await mongo.connect();
		debug.push("... managed to connect to mongoDB.");
		let added = await mongo
		.db(dbname)
		.collection(collection2)
		.insertOne({

			modello: newObject.modello,
			marca: newObject.marca,
			anno: parseInt(newObject.anno),
			categoria: newObject.categoria,
			condizioni: newObject.condizioni,
			prezzo: parseInt(newObject.prezzo),
			disponibilita: "",
			img: newObject.img
		});
     await mongo.close();
	
	}
	catch (e) {
		e.debug = debug
		return e
	}
}


exports.getGames = async function (credentials) {

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
		.sort({ nome: 1 })
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
	  console.log(debug)
	  const mongo = new MongoClient(mongouri);
	  await mongo.connect();
	  let result = [];
	  debug.push("... managed to connect to MongoDB.");
	  //console.log(debug)
	  await mongo
		.db(dbname)
		.collection(collection1)
		.find()
		.sort({ nome: 1 })
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
  


/* Untested */
// https://stackoverflow.com/questions/39599063/check-if-mongodb-is-connected/39602781


exports.isConnected = async function() {
	
	let client = await MongoClient.connect(mongouri);
	return !!client && !!client.topology && client.topology.isConnected()	
}




