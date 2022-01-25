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
//global.userLogged = "nessun"; 

const template = require(global.rootDir + '/scripts/tpl.js') ; 
const mymongo = require(global.rootDir + '/scripts/mongo.js') ; 
const express = require('express') ;
const cors = require('cors');
const path= require('path')



/* ========================== */
/*                            */
/*  EXPRESS CONFIG & ROUTES   */
/*                            */
/* ========================== */

let app= express(); 
app.use('/js'  , express.static(global.rootDir +'/public/js'));
app.use('/css' , express.static(global.rootDir +'/public/css'));
app.use('/data', express.static(global.rootDir +'/public/data'));
app.use('/docs', express.static(global.rootDir +'/public/views'));
app.use('/img' , express.static(global.rootDir +'/public/media'));
app.use(express.urlencoded({ extended: true })) 
app.use(cors())

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

app.get('/db/findClienti', async function(req, res) { 
	res.send(await mymongo.findClienti(mongoCredentials))
});
/*
app.get('/db/getUserLogged', async function(req, res) { 
	let usernameLogged = req.body.usernameLogged
	res.send(await mymongo.getUserLogged(usernameLogged,mongoCredentials))
});
*/
app.get('/db/getGames', async function(req, res) {
	res.send(await mymongo.getGames(mongoCredentials))
});

app.post('/db/updateUser', async function(req, res) {
	let oldUser = req.body.oldUser
	let newUser = req.body.formData
	res.send(await mymongo.updateUser(oldUser,newUser,mongoCredentials))
});


app.post('/db/updateObject', async function(req, res) {
	let oldObject = req.body.oldObject
	let newObject = req.body.formData
	res.send(await mymongo.updateObject(oldObject,newObject,mongoCredentials))
});


app.delete('/db/deleteUser', async function(req, res) {
	let oldUser = req.body.oldUser	
	res.send(await mymongo.deleteUser(oldUser,mongoCredentials))
});


app.delete('/db/deleteObject', async function(req, res) {
	let oldObject = req.body.oldObject	
	res.send(await mymongo.deleteObject(oldObject,mongoCredentials))
});

app.get('/db/findUserLogged', async function(req, res) {
	
	res.send(await mymongo.findUserLogged(mongoCredentials))
});


app.post('/db/deleteUserLogged', async function(req, res) {
	
	res.send(await mymongo.deleteUserLogged(mongoCredentials))
});
/*
app.post('/db/loggedUserSetFalse', async function(req,res){
    res.send(await mymongo.loggedUserSetFalse(mongoCredentials))
})
*/

/* ========================== */
/*                            */
/*         PASSPORT           */
/*                            */
/* ========================== */

const session = require('express-session');
const passport = require('passport');
//const checkUserLogin = require('./app/middleware/check-user-login');


//    router
const loginRouter = require('./app/routes/login.js');
const userRouter = require('./app/routes/user.js');
const registerRouter = require('./app/routes/register.js');
//const crudRouter = require('./app/routes/crud.js');
//const conn = require('./scripts/mongoose');

//    view engine setup html
//app.use(express.static(path.join(__dirname, 'public')));
//app.set('views', path.join(__dirname, './app/views'));

app.set('views', path.join(__dirname, './public/views'))
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//var cookieParser = require('cookie-parser');
var MongoStore = require('connect-mongo');
//const { request } = require('http');
//var mongoose = require('mongoose');


let store = new MongoStore({
	mongoUrl: "mongodb://127.0.0.1:27017/site202127", //chage with new domain in docker
	collection: "sessions"
	//stringify:true,
    //autoReconnect:true
 });


//   app.use
app.use(session({
	secret: 'chiaveSegreta123',
	saveUninitialized: false,
	resave: false,
	cookie: { domain:'http://localhost:8000' }, //change with new domain in docker
	store: store /*
	new MongoStore({
		mongooseConnection: 'site202127',    
		host: '', 
		port: '27017', 
		collections: 'sessions', 
		url: 'mongodb://127.0.0.1:27017/site202127'    
	  })*/
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(loginRouter);
app.use(registerRouter);
app.use('/user'/*, checkUserLogin()*/, userRouter);
//app.use('/user1', checkUserLogin1(), userRouter1);

/*
var cookieParser = require('cookie-parser');
app.use(cookieParser());  

app.use(function(req,res,next) {  
	res.locals.session = req.session;  
	next();   
}); 
*/

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
