const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcryptjs");
const User = require('../app/model/clientiModel.js');


passport.serializeUser((user, done) => {
    done(null, user.id);
});


passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});
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

passport.use(
    'local-login', 
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



module.exports = passport;