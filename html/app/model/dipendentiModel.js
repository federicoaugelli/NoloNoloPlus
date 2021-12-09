const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const conn = require('../../scripts/mongoose.js');
  
const userSchema = new Schema({   
    username : {type: String, required:true, unique:true},
    password: {type: String, required:true, unique:true},
    ruolo : {type: String, required:true, unique:false},
});
  
// plugin for passport-local-mongoose
userSchema.plugin(passportLocalMongoose);
  
// export userschema
const collectionName = 'registrodipendenti';

module.exports = mongoose.model('registroDipendenti', userSchema, collectionName);
 