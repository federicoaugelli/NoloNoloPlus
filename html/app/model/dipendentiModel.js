const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passport = require('passport')
const passportLocalMongoose = require('passport-local-mongoose');
const conn = require('../../scripts/mongoose.js');
  
const dipendentiSchema = new Schema({   
    username : { type: String, required:true, unique:true },
    password: { type: String, required:true, unique:false },
    ruolo : { type: String }
});

// plugin for passport-local-mongoose
dipendentiSchema.plugin(passportLocalMongoose);
  
// export userschema
const collectionName = 'registrodipendenti';

module.exports = mongoose.model('registrodipendenti', dipendentiSchema, collectionName);
 

