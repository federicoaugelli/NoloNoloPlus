const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcryptjs");
const User = require('../app/model/clientiModel.js');
const User2 = require('../app/model/dipendentiModel.js');

/*
passport.serializeUser((User, done) => {
    done(null, User.id);
});


passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});
*/

/*


passport.deserializeUser((id, done) => {
   //recupero dell'utente nel database
   const user = { id: 1, username: 'gianluca'};
   done(null, user);
})
*/

/*
passport.use(
    'local-login', 
    new LocalStrategy((username, password, done) =>{
        if(username === 'gianluca' && password === '123') {
            const user = { id: 1, username: 'gianluca' };
            return done(null, user);
        }        
        return done(null, false);            
    })
);
*/


// CREO LA MIA STRATEGIA DI AUTENTICAZIONE CON I VARI CONTROLLI SU USERNAME E PASSWORD CLIENTI


/*
passport.use(
    'local-login-cliente', 
    new LocalStrategy({ usernameField: "username" }, (username, password, done) =>{
        // MATCH USER
        User.findOne({ username: username })
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
               
                User2.findOne({ username: username })
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
            });;
    })
);
*/

function SessionConstructor(userId, userGroup, details) {

    this.userId = userId;
    this.userGroup = userGroup;
    this.details = details;
}
  
  
module.exports = function(passport) {
  
  
    passport.serializeUser(function (userObject, done) {
  
      // userObject could be a Model1 or a Model2... or Model3, Model4, etc.
  
      let userGroup = "model1";
      let userPrototype =  Object.getPrototypeOf(userObject);
  
      if (userPrototype === User.prototype) {
  
        userGroup = "model1";
      } 
      else if (userPrototype === User2.prototype) {
  
        userGroup = "model2"; 
      }

      let sessionConstructor = new SessionConstructor(userObject.id, userGroup, '');
      done(null,sessionConstructor);
    });
  
  
    passport.deserializeUser(function (sessionConstructor, done) {
  
      if (sessionConstructor.userGroup == 'model1') {
  
        User.findOne({
  
            _id: sessionConstructor.userId 
        },'-localStrategy.password', function (err, user) { // When using string syntax, prefixing a path with - will flag that path as excluded.
  
            done(err, user);
        });
      } 
      else if (sessionConstructor.userGroup == 'model2') {
  
        User2.findOne({

            _id: sessionConstructor.userId
        }, '-localStrategy.password', function (err, user) { // When using string syntax, prefixing a path with - will flag that path as excluded.
  
            done(err, user);
        });
      }
    });
  
}


 passport.use(
    'local-login-cliente', 
    new LocalStrategy({ usernameField: "username" }, (username, password, done) =>{
        // MATCH USER
        User.findOne({ username: username })
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



 passport.use(
    'local-login-dipendente', 
    new LocalStrategy({ usernameField: "username" }, (username, password, done) =>{
        // MATCH USER
        User2.findOne({ username: username })
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