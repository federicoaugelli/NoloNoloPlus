const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcryptjs");
const User = require('../app/model/dipendentiModel.js');



passport.serializeUser((User, done) => {
    done(null, User.id);
});


passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});


// CREO LA MIA STRATEGIA DI AUTENTICAZIONE CON I VARI CONTROLLI SU USERNAME E PASSWORD DIPENDENTI

passport.use(
    'local-login-manager', 
    new LocalStrategy({ usernameField: "username" }, (username, password, done) =>{
        // MATCH USER
        User.findOne({ username: username , ruolo:"Manager"})
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
