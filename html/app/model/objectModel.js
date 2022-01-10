const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const conn = require('../../scripts/mongoose.js');
  
const gameSchema = new Schema({   
    game : { type: String, required:true, unique:false },
    platform : { type: String, required:true, unique:false },
    annoUscita : { type: String, required:true, unique:false },
    condizioni : { type: String, required:true, unique:false },
    etaMinima : { type: String, required:false },
    peso  : { type: String, required:false },
    numGiocatori  : { type: String, required:false },
    prezzo  : { type: String, required:false },
    disponibilita  : { type: String, required:false }
});
  
// plugin for passport-local-mongoose
gameSchema.plugin(passportLocalMongoose);
  
// export userschema
const collectionName = 'oggetti';

module.exports = mongoose.model('oggetti', gameSchema, collectionName);
 