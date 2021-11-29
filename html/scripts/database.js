import { connect, connection } from 'mongoose';
connect("mongodb://127.0.0.1:27017?writeConern=majority", {useNewUrlParser: true});
var conn = connection;
conn.on('connected', function() {
    console.log('database is connected successfully');
});
conn.on('disconnected',function(){
    console.log('database is disconnected successfully');
})
conn.on('error', console.error.bind(console, 'connection error:'));
export default conn;