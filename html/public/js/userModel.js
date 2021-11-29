const mongoose = require("../scripts/database");
 
// create an schema
var userSchema = new mongoose.Schema({
            username: String,
            password: String,
            ruolo: String,
            indirizzo: String, String, String
        });
 
var userModel = mongoose.model('users',userSchema);
 
module.exports = mongoose.model("Users", userModel);