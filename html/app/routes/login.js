const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportConfig = require('../../scripts/passport-config');
const checkUserLogin = require('../middleware/check-user-login');


//                                                                                       LOGIN BACKEND

// POSSO ACCEDERE ALLA ROTTA USER/BACKENDLOGGED SOLO SE SONO AUTENTICATO
router.get('/docs/backend', (req,res) => {
    if(req.isAuthenticated()) res.redirect('/docs/backendlogged');
    res.render('/docs/backend');
});

/*
router.get('/user/backendlogged', function(req, res){
    const { user: { username } = {} } = req;
    console.log(username)
    res.render('backofficelogged', {username});
    });
    */

//                SE SONO AUTENTICATO VADO AL BACKENDLOGGED SENNO MI RIMANDA AL LOGIN

/*
router.post('/docs/backend', passportConfig.authenticate('local-login-dipendente', {
    successRedirect: '/user/backendlogged',
    failureRedirect: '/docs/backend'
})); 
*/


router.post('/user/backendlogged', passportConfig.authenticate('local-login-dipendente'),
  function(req, res) {

    const { user: { username } = {} } = req;
    console.log(username)
    res.render('backofficelogged.html', {username} /*+ req.user.username*/);
    //res.redirect("/user/backendlogged")
  });


/*
router.post(
    "/docs/backend",
    passport.authenticate("local-login-dipendente"),
    (req, res, next) => {
        if (req.user) {
            var redir = { redirect: "/user/backendlogged" };
            return res.redirect("/user/backendlogged");

        } else if (!req.user) {
            var redir = { redirect: "/docs/backend" };
            return res.redirect("/docs/backend");
            
        }
    }
);
*/

/*
router.post('/docs/backend', function(req, res, next) {
    passportConfig.authenticate('local-login-dipendente', function(err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        res.writeHead(401, {'Content-Type': 'application/json'});
        return res.end();
      }
      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }
        res.writeHead(200, {'Content-Type': 'application/json'});
        return res.end();
      });
    })(req, res, next);
  });
*/

//                            IL LOGOUT MI RIMANDA AL BACKEND
router.get('/backendlogout', (req,res) => {
    req.logOut();
    res.redirect('/docs/backend');
    //res.render('backoffice.html');
})








//                                                                                        LOGIN FRONTEND

//              POSSO ACCEDERE ALLA ROTTA USER/FRONTENDLOGGED SOLO SE SONO AUTENTICATO
router.get('/docs/frontend', (req,res) => {
    if(req.isAuthenticated()) res.redirect('/user/frontendlogged');
    res.render('/docs/frontend');
    //console.log(req.user);
});

/*
router.get('/user/frontendlogged', function(req, res){
    const { user: { username } = {} } = req;
    console.log(username)
    res.render('frontofficelogged', {username});
    });
*/


// SE SONO AUTENTICATO VADO A USER/FRONTENDLOGGED SENNO MI RIMANDA AL LOGIN
router.post('/docs/frontend', passportConfig.authenticate('local-login-cliente', {
    successRedirect: '/user/frontendlogged' , 
    failureRedirect: '/docs/frontend'
    
    
}), (request, response) => {

    console.log(request.user)
    response.render()
}); 


//               IL LOGOUT MI RIMANDA AL FRONTEND
router.get('/frontendlogout', (req,res) => {
    req.logOut();
    res.redirect('/docs/frontend');
})




//                                                                                        LOGIN DASHBOARD

//              POSSO ACCEDERE ALLA ROTTA USER/DASHBOARD SOLO SE SONO AUTENTICATO
router.get('/docs/dashboard', (req,res) => {
    if(req.isAuthenticated()) res.redirect('/user/dashboardlogged');
    res.render('/docs/dashboard');
});



// SE SONO AUTENTICATO VADO A USER/DASHBOARD SENNO MI RIMANDA AL DASHBOARD LOGIN
router.post('/docs/dashboard', passportConfig.authenticate('local-login-manager', {
    successRedirect: '/user/dashboardlogged',
    failureRedirect: '/docs/dashboard'
})); 


//               IL LOGOUT MI RIMANDA AL BACKEND
router.get('/dashboardlogout', (req,res) => {
    req.logOut();
    res.redirect('/docs/dashboard');
})




module.exports = router;