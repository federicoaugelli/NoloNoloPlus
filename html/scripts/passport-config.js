const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

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

passport.use(
    'local-register', 
    new LocalStrategy((password, password2, done) =>{
        if(password === password2) {
            const user = { id: 1, username: 'gianluca' };
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