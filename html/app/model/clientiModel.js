const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const conn = require('../../scripts/mongoose.js');
  
const userSchema = new Schema({   
    username : {type: String, required:true, unique:true},
    password: {type: String, required:true, unique:true},
    email : {type: String, required:true, unique:true},
});
  
// plugin for passport-local-mongoose
userSchema.plugin(passportLocalMongoose);
  
// export userschema
const collectionName = 'registroclienti';

module.exports = mongoose.model('registroClienti', userSchema, collectionName);
 