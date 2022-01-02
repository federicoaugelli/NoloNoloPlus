var mongoose = require('mongoose');

//const mongouri = `mongodb://${credentials.user}:${credentials.pwd}@${credentials.site}?writeConcern=majority`;


//mongoose.connect('mongodb://127.0.0.1:27017/site202127', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect(`mongodb://${credentials.user}:${credentials.pwd}@${credentials.site}?writeConcern=majority`, {useNewUrlParser: true, useUnifiedTopology: true});
var conn = mongoose.connection;
conn.on('connected', function() {
    console.log('MONGOOSE database is connected successfully');
});
conn.on('disconnected',function(){
    console.log('database is disconnected successfully');
})
conn.on('error', console.error.bind(console, 'connection error:'));



module.exports = conn;