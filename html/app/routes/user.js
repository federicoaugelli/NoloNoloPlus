const express = require('express');
const router = express.Router();

// ROTTE PROTETTE ACCESSIBILI SOLO DOPO LOGIN
 
router.get('/dashboard', (req,res) => {
    const html = '<h3><a href=/logout> Ti sei loggato. Effettua il logout</a></h3>';
    res.send(html);
    res.send('dashboard');
})

router.get('/dashboard-2', (req,res) => {
    const html = '<h3><a href=/logout> Ti sei registrato. Effettua il logout</a></h3>';
    res.send(html);
    res.send('dashboard-2');
});


router.get('/backendlogged', (req, res) => { 

    res.render('/backendlogged');
    //res.send('backendlogged');
	//res.sendFile(path.join(__dirname+'../../public/html/backofficelogged.html'));
});

module.exports = router;