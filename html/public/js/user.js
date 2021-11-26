// dependencies
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
// connect to database
mongoose.connect('mongodb://127.0.0.1:27017?writeConern=majority',{
  useNewUrlParser: true,
  useUnifiedTopology: true
});
// Create Model
const Schema = mongoose.Schema;
const User = new Schema({
  username: String,
  password: String,
  indirizzo: String,String,String
});
// Export Model
User.plugin(passportLocalMongoose);

module.exports = mongoose.model('userData', User, 'userData');

UserDetails.register({ username: 'candy', active: false }, 'cane');
UserDetails.register({ username: 'starbuck', active: false }, 'redeye');