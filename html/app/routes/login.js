const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportConfig = require('../../scripts/passport-config');
const passportConfig2 = require('../../scripts/passport-config2');

/*
const LocalStrategy = require('passport-local').Strategy;
passport.use('local-login-dipendente', myLocalStrategy1)
passport.use('local-login-dipendente', new LocalStrategy(passportConfig2.authenticate()));
*/
                                                    
//                                                                                 PROVA DASHBOARD
/*
// POSSO ACCEDERE ALLA ROTTA USER/DASHBOARD SOLO SE SONO AUTENTICATO
router.get('/login', (req,res) => {
    if(req.isAuthenticated()) return res.redirect('/user/dashboard');
    res.render('login');
});

// SE SONO AUTENTICATO VADO ALLA DASBOARD SENNO MI RIMANDA AL LOGIN
router.post('/login', passport.authenticate('local-login3', {
    successRedirect: '/user/dashboard',
    failureRedirect: '/login'
})); 

// IL LOGOUT MI RIMANDA AL LOGIN
router.get('/logout', (req,res) => {
    req.logOut();
    res.redirect('/login');
})
*/






//                                                                                       LOGIN BACKEND

// POSSO ACCEDERE ALLA ROTTA USER/BACKENDLOGGED SOLO SE SONO AUTENTICATO
router.get('/backend', (req,res) => {
    if(req.isAuthenticated()) return res.redirect('/user/backendlogged');
    res.render('/backend');
});


//                SE SONO AUTENTICATO VADO AL BACKENDLOGGED SENNO MI RIMANDA AL LOGIN
router.post('/backend'  /*, (req, res) => {
    if (!req.body.username) {
      return res.status(400).json({
        status: 'error',
        error: 'req body cannot be empty',
      });
    }
  
    res.status(200).json({
      status: 'succes',
      data: req.body,
    })
  }*/, passport.authenticate('local-login-dipendente', {
    successRedirect: '/user/backendlogged',
    failureRedirect: '/backend'
})); 


/*
router.post("/backend", (req, res, next) => {
    passportConfig2.authenticate('local-login-cliente', function(err, user, info) {
        if(err) {
            return res.status(400).json({ errors: err });
        }
        if(!user) {
            //return res.render('/backend');
            res.redirect('/backend');
            //return res.status(400).json({ errors: "No user found" });
        }
        req.logIn(user, function(err) {
            if(err) {
                
                return res.status(400).json({ errors: err });
            }
            //return res.status(200).json({ success: 'logged in ${user.id}'});
            return res.redirect('/user/backendlogged');
            //res.sendFile(path.join('../../public/views/backofficelogged.html'))
            
        });
    })(req, res, next);
});
*/

           
//                SE SONO AUTENTICATO VADO AL BACKENDLOGGED SENNO MI RIMANDA AL BACKEND

/*
router.post("/backend", (req, res, next) => {
    passportConfig2.authenticate('local-login', {
        successRedirect: '/user/backendlogged',
        failureRedirect: '/backend',
    }, function(err, user, info) {
        if(err) {
            return res.status(400).json({ errors: err });
        }
        if(!user) {
            return res.status(400).json({ errors: "No user found" });
        }
        req.logIn(user, function(err) {
            if(err) {
                
                return res.status(400).json({ errors: err });
            }
            return res.status(200).json({ success: 'logged in ${user.id}'});
        });
    })(req, res, next);
});
*/

//                            IL LOGOUT MI RIMANDA AL BACKEND
router.get('/backendlogout', (req,res) => {
    req.logOut();
    res.redirect('/backend');
})








//                                                                                        LOGIN FRONTEND

//              POSSO ACCEDERE ALLA ROTTA USER/DASHBOARD SOLO SE SONO AUTENTICATO
router.get('/frontend', (req,res) => {
    if(req.isAuthenticated()) return res.redirect('/user/dashboard');
    res.render('/frontend');
});



// SE SONO AUTENTICATO VADO A USER/DASHBOARD SENNO MI RIMANDA AL LOGIN
router.post('/frontend' /*, (req, res) => {
    if (!req.body.username) {
      return res.status(400).json({
        status: 'error',
        error: 'req body cannot be empty',
      });
    }
  
    res.status(200).json({
      status: 'succes',
      data: req.body,
    })
  }  */, passport.authenticate('local-login-cliente', {
    successRedirect: '/user/backendlogged',
    failureRedirect: '/frontend'
})); 


/*
//           SE SONO AUTENTICATO VADO A USER/DASHBOARD SENNO MI RIMANDA AL FRONTEND

router.post("/frontend", (req, res, next) => {
    passportConfig.authenticate('local-login-cliente', {
        successRedirect: '/user/dashboard',
        failureRedirect: '/frontend',
    }, function(err, user, info) {
        if(err) {
            return res.status(400).json({ errors: err });
        }
        if(!user) {
            return res.status(400).json({ errors: "No user found" });
        }
        req.logIn(user, function(err) {
            if(err) {
                
                return res.status(400).json({ errors: err });
            }
            return res.redirect('/user/backendlogged');
        //return res.status(200).json({ success: 'logged in ${user.id}'});
        });
    })(req, res, next);
});
*/


//               IL LOGOUT MI RIMANDA AL BACKEND
router.get('/frontendlogout', (req,res) => {
    req.logOut();
    res.redirect('/frontend');
})



module.exports = router;