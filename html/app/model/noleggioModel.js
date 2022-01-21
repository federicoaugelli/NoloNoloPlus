const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const conn = require('../../scripts/mongoose.js');
  
const noleggioSchema = new Schema({   
    usernameCliente : { type: String, required:false, unique:false },
    titoloNoleggiato: { type: String, required:false, unique:false },
    usernameFunzionario : { type: String, required:false, unique:false },
    durataNoleggio : { type: String, required:false, unique:false },
    stato: { type: String, required:false, unique:false },
    conclusioni: { type: String, required:false, unique:false }

});
  
// plugin for passport-local-mongoose
noleggioSchema.plugin(passportLocalMongoose);
  
// export userschema
const collectionName = 'noleggi';

module.exports = mongoose.model('noleggi', noleggioSchema, collectionName);
 