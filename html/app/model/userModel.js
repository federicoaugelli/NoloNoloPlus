// importing modules
/*
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
  
  
var UserSchema = new Schema({   
    username : {type: String, required:true, unique:true},
    password: {type: String, required:true, unique:true},
    ruolo : {type: String, required:true, unique:false},
});
  
// plugin for passport-local-mongoose
UserSchema.plugin(passportLocalMongoose);
  
// export userschema
 module.exports = mongoose.model("User", UserSchema);
 */