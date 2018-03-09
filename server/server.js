
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// // Start Mongoose setup
const mongoose = require('mongoose');
const db = mongoose.connection;
db.on('error', console.error);
mongoose.connect('mongodb://localhost:27017/contactlist');

   var clschema = mongoose.Schema({
   name: String, 
   email: String,
   number: String
 }, {collection: 'contactlist'});

const ContactList = mongoose.model('ContactList', clschema);
// // End Mongoose

//  ////////////////////////////////////////////////////////////////////////
//  //this is just for testing the connection - comment out after working //
//  ////////////////////////////////////////////////////////////////////////
//  // app.get('/', function (request, response){
//  //     response.send('test message from server.js')
//  // })
//  ////////////////////////////////
//  // end server connection test //
//  ////////////////////////////////

app.use( express.static( 'server/public' ) );
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/contactlist', function(request, response){
console.log('I got a request');  
 
  ContactList.find(function(error, contact) {
    if (error) throw error;
    response.json(contact);
    });
});

app.post('/contactlist', function(request, response){
    console.log(request.body);
    ContactList.insertMany(request.body, function (error, doc) {
        response.json(doc);
    })
});
 
app.delete('/contactlist/:id', function(request, response){
    let id = request.params.id;
    console.log(id);
	ContactList.remove({_id: request.params.id}, 
	   function(error){
		if(error) response.json(error);
	});
});

app.get('/contactlist/:id', function(request, response){
    let id = request.params.id;
    console.log(id);
	ContactList.findOne({_id: request.params.id}, 
	   function(error){
		if(error) response.json(error);
	});
});

app.listen(5000);
console.log("Server running on port 5000");