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

global.rootDir = __dirname ;
global.startDate = null; 

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


app.get('/dashboard-2', (req,res) => {
    const html = '<h3><a href=/backendendlogout> Ti sei registrato come nuovo  utente. Effettua il logout</a></h3>';
    res.send(html);
    res.send('dashboard-2');
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
const registerRouter = require('./app/routes/register.js');
//const crudRouter = require('./app/routes/crud.js');
//const conn = require('./scripts/mongoose');

//    view engine setup html
//app.use(express.static(path.join(__dirname, 'public')));
//app.set('views', path.join(__dirname, './app/views'));

app.set('views', path.join(__dirname, './public/views'))
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//const MongoStore = require('connect-mongo')(session);

//   app.use
app.use(session({
	secret: 'chiaveSegreta123',
	saveUninitialized: false,
	resave: false
	//cookie: { maxAge: 600000 }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(loginRouter);
app.use(registerRouter);
//app.use(crudRouter);
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
