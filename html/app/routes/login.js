const express = require('express');
const router = express.Router();
const passport = require('../../scripts/passport-config');
const passport2 = require('../../scripts/passport-config2');

                                                    
//                                                                                 PROVA DASHBOARD

// POSSO ACCEDERE ALLA ROTTA USER/DASHBOARD SOLO SE SONO AUTENTICATO
router.get('/login', (req,res) => {
    if(req.isAuthenticated()) return res.redirect('/user/dashboard');
    res.render('login');
});

// SE SONO AUTENTICATO VADO ALLA DASBOARD SENNO MI RIMANDA AL LOGIN
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/user/dashboard',
    failureRedirect: '/login'
})); 
/*
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

/*
//                SE SONO AUTENTICATO VADO AL BACKENDLOGGED SENNO MI RIMANDA AL LOGIN
router.post('/backend', passport.authenticate('local-login', {
    successRedirect: '/user/backendlogged',
    failureRedirect: '/backend',
})); 
*/

//           SE SONO AUTENTICATO VADO A USER/DASHBOARD SENNO MI RIMANDA AL BACKEND

router.post("/backend", (req, res, next) => {
    passport2.authenticate('local-login2', {
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
/*
// SE SONO AUTENTICATO VADO A USER/DASHBOARD SENNO MI RIMANDA AL LOGIN
router.post('/frontend', passport.authenticate('local-login', {
    successRedirect: '/user/dashboard',
    failureRedirect: '/frontend',
})); 
*/

//           SE SONO AUTENTICATO VADO A USER/DASHBOARD SENNO MI RIMANDA AL FRONTEND

router.post("/frontend", (req, res, next) => {
    passport.authenticate('local-login', {
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
            return res.status(200).json({ success: 'logged in ${user.id}'});
        });
    })(req, res, next);
});



//               IL LOGOUT MI RIMANDA AL BACKEND
router.get('/frontendlogout', (req,res) => {
    req.logOut();
    res.redirect('/frontend');
})


module.exports = router;