const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Bcrypt = require("bcryptjs");
const cliente = require('../app/model/clientiModel.js');
const dipendente = require('../app/model/clientiModel.js');

// CREO LA MIA STRATEGIA DI AUTENTICAZIONE CON I VARI CONTROLLI SU USERNAME E PASSWORD

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


/*
passport.use(
    'local-login', 
    new LocalStrategy((username, password, done) =>{
        
        cliente.findOne({username: username}, function(err, user){
            if(err){ return done(err); }
            if(!username) {return done(null, false, {message: "User not found"}); }
            if(!Bcrypt.compareSync(req.body.password, user.password)) { return done(null, false, {message: "Invalid password"}); }
            
            return done(null, user);
        })
    })
);
*/

passport.use(
    'local-register', 
    new LocalStrategy((password,passwordconf, done) =>{
        if(password === passwordconf) {
           // const user = { id: 1, username: 'gianluca' };
            return done(null, user);
        }        
        return done(null, false);            
    })
);

passport.serializeUser((user, done) => {
     done(null, user.id);
});

passport.deserializeUser((id, done) => {
    //recupero dell'utente nel database
    const user = { id: 1, username: 'gianluca'};
    done(null, user);
})

module.exports = passport;