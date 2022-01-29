const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const conn = require('../../scripts/mongoose.js');
  
const userSchema = new Schema({   
    nome : { type: String, required:true, unique:false },
    cognome : { type: String, required:true, unique:false },
    username : { type: String, required:true, unique:true },
    password : { type: String, required:true, unique:false },
    citta : { type: String, required:false },
    via : { type: String, required:false },
    punti  : { type: String }
});
  
// plugin for passport-local-mongoose
userSchema.plugin(passportLocalMongoose);
  
// export userschema
const collectionName = 'registroclienti';

module.exports = mongoose.model('registroClienti', userSchema, collectionName);
 