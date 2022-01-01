const express = require('express');
const router = express.Router();
const path= require('path');
//global.rootDir = __dirname ;

// ROTTE PROTETTE ACCESSIBILI SOLO DOPO LOGIN

router.get('/dashboard', (req,res) => {
    const html = '<h3><a href=/frontendlogout> Ti sei loggato come utente. Effettua il logout</a></h3>';
    res.send(html);
    res.send('dashboard');
});

/*
router.get('/dashboard-2', (req,res) => {
    const html = '<h3><a href=/frontendlogout> Ti sei registrato come nuovo  utente. Effettua il logout</a></h3>';
    res.send(html);
    res.send('dashboard-2');
});
*/


router.get('/backendlogged', (req, res) => { 
     
	res.sendFile(path.join(__dirname+'/../../public/views/backofficelogged.html'));
});

module.exports = router;
