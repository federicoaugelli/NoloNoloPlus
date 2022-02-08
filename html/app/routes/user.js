const express = require('express');
const router = express.Router();
const path= require('path');


// ROTTE PROTETTE ACCESSIBILI SOLO DOPO LOGIN

/*
router.get('/backendlogged', (req, res) => { 

	res.sendFile(path.join(__dirname+'/../../public/views/backofficelogged.html'));
});

*/


router.get('/backendlogged' , (req, res) => { 

    const { user: { username } = {} } = req;
    console.log(username)
    return res.render('backofficelogged', {username});
    
});

/*

router.get('/frontendlogged', (req, res) => { 
     
	res.sendFile(path.join(__dirname+'/../../public/views/frontofficelogged.html'));
});
*/


router.get('/frontendlogged', (req, res) => { 

    const { user: { username } = {} } = req;
    console.log(username)
    return res.render('frontofficelogged', {username});
     
});


router.get('/dashboardlogged', (req, res) => { 
     
	res.sendFile(path.join(__dirname+'/../../public/views/dashboardlogged.html'));
});


module.exports = router;
