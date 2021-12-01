const { array } = require('joi');
let mongoose = require('mongoose');

// User Schema
let UserSchema = mongoose.Schema({
  username:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  ruolo:{
    type: String,
    required: true
  },
  indirizzo:{
    type: array(String),
    required: true
  },
  
});

const User = module.exports = mongoose.model('User', UserSchema);