/*
File: index.js
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



/* ========================== */
/*                            */
/*           SETUP            */
/*                            */
/* ========================== */

global.rootDir = __dirname;
global.startDate = null; 

const template = require(global.rootDir + '/scripts/tpl.js') ; 
const mymongo = require(global.rootDir + '/scripts/mongo.js') ; 
const express = require('express') ;
const cors = require('cors');
const path= require('path');
//const bodyParser = require('body-parser');




/* ========================== */
/*                            */
/*  EXPRESS CONFIG & ROUTES   */
/*                            */
/* ========================== */

let app = express(); 
app.use('/js'  , express.static(global.rootDir +'/public/js'));
app.use('/css' , express.static(global.rootDir +'/public/css'));
app.use('/data', express.static(global.rootDir +'/public/data'));
app.use('/docs', express.static(global.rootDir +'/public/views'));
app.use('/img' , express.static(global.rootDir +'/public/media'));
app.use(express.urlencoded({ extended: true , limit: "10mb"}));
app.use(cors())
//app.use(bodyParser.json());

// https://stackoverflow.com/questions/40459511/in-express-js-req-protocol-is-not-picking-up-https-for-my-secure-link-it-alwa
app.enable('trust proxy');


app.get('/', async function (req, res) { 
	let sitename = req.hostname.split('.')[0]
	res.send(await template.generate('index.html', {
			host: req.hostname,
			site: sitename
	}));
})

app.get('/hw', async function(req, res) { 
	var text = "Hello world as a Node service";
	res.send(
`<!doctype html>
<html>
	<body>
		<h1>${text}</h1>
		<p><a href="javascript:history.back()">Go back</a></p>
	</body>
</html>
			`)
});

app.get('/hwhb', async function(req, res) { 
	res.send(await template.generate('generic.html', {
		text: "Hello world as a Handlebar service",
	}));
});

const info = async function(req, res) {
	let data = {
		startDate: global.startDate.toLocaleString(), 
		requestDate: (new Date()).toLocaleString(), 
		request: {
			host: req.hostname,
			method: req.method,
			path: req.path,
			protocol: req.protocol
		}, 
		query: req.query,
		body: req.body
	}
	res.send( await template.generate('info.html', data));
}

app.get('/info', info )
app.post('/info', info )


app.get('/docs/frontend', async function(req, res) { 
	res.sendFile(path.join(__dirname+'/public/views/frontoffice.html'));
});

app.get('/docs/backend', async function(req, res) { 
	
	res.sendFile(path.join(__dirname+'/public/views/backoffice.html'));
});


app.get('/docs/dashboard', async function(req, res) { 
	res.sendFile(path.join(__dirname+'/public/views/dashboard.html'));
});




/* ========================== */
/*                            */
/*           MONGODB          */
/*                            */
/* ========================== */

/* Replace these info with the ones you were given when activating mongoDB */ 
const mongoCredentials = {
	user: "site202127",
	pwd: "eer6Beir",
	site: "mongo_site202127"
}  
/* end */


app.get('/db/create', async function(req, res) { 
	res.send(await mymongo.create(mongoCredentials))
});

app.get('/db/search', async function(req, res) { 
	res.send(await mymongo.search(req.query, mongoCredentials))
});


app.post('/db/registerCliente', async function(req, res) {
	let newUser = req.body.formData
	res.send(await mymongo.registerCliente(newUser,mongoCredentials))
});

app.post('/db/registerObject', async function(req, res) {
	let newObject = req.body.formData
	res.send(await mymongo.registerObject(newObject,mongoCredentials))
});

app.post('/db/registerNoleggio', async function(req, res) {
	let newNoleggio = req.body.formData
	res.send(await mymongo.registerNoleggio(newNoleggio,mongoCredentials))
});

app.post('/db/registerNoleggioClient', async function(req, res) {
	let newNoleggio = req.body.formData
	res.send(await mymongo.registerNoleggioClient(newNoleggio,mongoCredentials))
});

app.get('/db/findClienti', async function(req, res) { 
	res.send(await mymongo.findClienti(mongoCredentials))
});

app.get('/db/getGames', async function(req, res) {
	res.send(await mymongo.getGames(mongoCredentials))
});


app.get('/db/getDipendenti', async function(req, res) {
	res.send(await mymongo.getDipendenti(mongoCredentials))
});

app.get('/db/getUserItems', async function(req, res) {
	res.send(await mymongo.getUserItems(mongoCredentials))
});

app.get('/db/getNoleggi', async function(req, res) {
	res.send(await mymongo.getNoleggi(mongoCredentials))
});

app.get('/db/getNoleggiTerminati', async function(req, res) {
	res.send(await mymongo.getNoleggiTerminati(mongoCredentials))
});

app.get('/db/getNoleggiAttivi', async function(req, res) {
	res.send(await mymongo.getNoleggiAttivi(mongoCredentials))
});

app.get('/db/getNoleggiFuturi', async function(req, res) {
	res.send(await mymongo.getNoleggiFuturi(mongoCredentials))
});

app.post('/db/updateNoleggioFuturo', async function(req, res) {
	let oldNoleggio = req.body.oldNoleggio
	let newNoleggio = req.body.formData
	res.send(await mymongo.updateNoleggioFuturo(oldNoleggio,newNoleggio,mongoCredentials))
});

app.post('/db/updateUser', async function(req, res) {
	let oldUser = req.body.oldUser
	let newUser = req.body.formData
	res.send(await mymongo.updateUser(oldUser,newUser,mongoCredentials))
});

app.post('/db/updateClient', async function(req, res) {
	let oldUser = req.body.oldUser
	let newUser = req.body.formData
	res.send(await mymongo.updateClient(oldUser,newUser,mongoCredentials))
});

app.post('/db/createLease', async function(newLease, res) {
	//let newLease = req
	//console.log (newLease)
	res.send(await mymongo.createLease(newLease, mongoCredentials))
})

app.post('/db/updateObject', async function(req, res) {
	let oldObject = req.body.oldObject
	let newObject = req.body.formData
	res.send(await mymongo.updateObject(oldObject,newObject,mongoCredentials))
});

app.post('/db/updateNoleggioDopoModificaUsername', async function(req, res) {
	oldUsername = req.body.oldUsername
	userCliente = req.body.userCliente
	res.send(await mymongo.updateNoleggioDopoModificaUsername(oldUsername,userCliente,mongoCredentials))
});

app.post('/db/updateLease', async function(req, res) {
	let oldObject = req.body.oldObject
	let newObject = req.body.formData
	res.send(await mymongo.updateLease(oldObject,newObject,mongoCredentials))
});

app.post('/db/updatePuntiCliente', async function(req, res) {
	user = req.body.user
	puntiRimasti = req.body.puntiRimasti
	res.send(await mymongo.updatePuntiCliente(user, puntiRimasti, mongoCredentials))
});

app.post('/db/updatePuntiClientSide', async function(req, res) {
	user = req.body.user
	points = req.body.points
	res.send(await mymongo.updatePuntiClientSide(user,points,mongoCredentials))
});

app.post('/db/decreasePuntiClientSide', async function(req, res) {
	user = req.body.user
	points = req.body.points
	res.send(await mymongo.decreasePuntiClientSide(user,points,mongoCredentials))
});

app.delete('/db/deleteUser', async function(req, res) {
	let oldUser = req.body.oldUser	
	res.send(await mymongo.deleteUser(oldUser,mongoCredentials))
});


app.delete('/db/deleteNoleggioFuturo', async function(req, res) {
	let oldNoleggio = req.body.oldNoleggio
	res.send(await mymongo.deleteNoleggioFuturo(oldNoleggio,mongoCredentials))
});

app.delete('/db/deleteObject', async function(req, res) {
	let oldObject = req.body.oldObject	
	res.send(await mymongo.deleteObject(oldObject,mongoCredentials))
});

app.delete('/db/deleteLease', async function(req, res) {
	let oldObject = req.body.oldObject	
	res.send(await mymongo.deleteLease(oldObject,mongoCredentials))
}); 

app.delete('/db/deleteDipendentiCollection', async function(req, res) {
		
	res.send(await mymongo.deleteDipendentiCollection(mongoCredentials))
});


/* ========================== */
/*                            */
/*         PASSPORT           */
/*                            */
/* ========================== */

const session = require('express-session');
const passport = require('passport');
const checkUserLogin = require('./app/middleware/check-user-login');


//    router
const loginRouter = require('./app/routes/login.js');
const userRouter = require('./app/routes/user.js');
//const registerRouter = require('./app/routes/register.js');

app.set('views', path.join(__dirname, './public/views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(session({
	secret: 'chiaveSegreta123',
	saveUninitialized: false,
	resave: false,
	name: 'cookie sessione',
	cookie: { maxAge: 60000000}
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(loginRouter);
//app.use(registerRouter);
//app.use(userRouter);
app.use('/user', checkUserLogin(), userRouter);


/* ========================== */
/*                            */
/*    ACTIVATE NODE SERVER    */
/*                            */
/* ========================== */

app.listen(8000, function() { 
	global.startDate = new Date() ; 
	console.log(`App listening on port 8000 started ${global.startDate.toLocaleString()}` )
})


/*       END OF SCRIPT        */
