const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcryptjs");
const User = require('../app/model/clientiModel.js');
const Dipendenti = require('../app/model/dipendentiModel.js');





passport.serializeUser((user, done) => {
    
    done(null, user.id);
});





passport.deserializeUser((id, done) => {
    
    User.findById(id).then((user) => {
        if(null) done(null);
        if(user) done(null, user);
        else {
        Dipendenti.findById(id).then((user) => {
            if(null) done(null);
                done(null, user);
            });
        }
    });
});


/*
passport.serializeUser(function(user, done) {
    
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    
    done(null, user);
});
*/



 passport.use(
    'local-login-cliente', 
    new LocalStrategy({ usernameField: "username" }, (username, password, done) =>{
        // MATCH USER
        
        User.findOne({ username: username})
            .then(user => {
                if(!user){
                    return done(null, false, { message: "username sbagliato"});
                } else {
                    //match password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;

                        if (isMatch){
                            console.log(user);                   
                            
                            return done(null, user);
                        } else {
                            return done(null, false, { message: "password sbagliata"});
                        }
                    });
                }
            })
            .catch(err => {
                return done(null, false, {message: err});
            });;
    })
 );



 passport.use(
    'local-login-dipendente', 
    new LocalStrategy({ usernameField: "username"}, (username, password, done) =>{
        // MATCH USER
        Dipendenti.findOne({ username: username })
            .then(user => {
                if(!user){
                    return done(null, false, { message: "username sbagliato"});
                } else{ 
                    //match password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;
                        if (isMatch){
                            console.log(user)
                            return done(null, user);
                        } else {                 
                            return done(null, false, { message: "password sbagliata"});
                        }
                   });
                }
            })
            .catch(err => {
                return done(null, false, {message: err});
            });;
    })
 );


/*
passport.use(new LocalStrategy(
    function(username, password, done) {
      Dipendenti.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch){
                console.log(user)
                return done(null, user);
            } else {                 
                return done(null, false, { message: "password sbagliata"});
            }
       });
        return done(null, user);
      });
    }
  ));
*/


 
 
passport.use(
    'local-login-manager', 
    new LocalStrategy({ usernameField: "username" }, (username, password, done) =>{
        // MATCH USER
        Dipendenti.findOne({ username: username , ruolo:"Manager"})
            .then(user => {
                if(!user){
                    return done(null, false, { message: "username sbagliato"});
                } else {
                    //match password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;

                        if (isMatch){
                            return done(null, user);
                        } else {
                            return done(null, false, { message: "password sbagliata"});
                        }
                    });
                }
            })
            .catch(err => {
                return done(null, false, {message: err});
            });;
    })
);


module.exports = passport;