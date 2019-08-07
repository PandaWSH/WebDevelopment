var request = require("request");
var express = require("express");
var app = express();
const mongoose = require('mongoose');

request('https://jsonplaceholder.typicode.com/users/1', (error, response, body)=> {
	//eval(require('locus'))
	if(!error && response.statusCode == 200){
		const parsedData = JSON.parse(body);
		console.log(parsedData.name + ' lives in '+ parsedData.address.city);
		//console.log('${parsedData.name} lives in ${parsedData.address.city}');
	}
});


// *********** server setup **************
app.listen(9000, () => {
	console.log("server test ok!");
});

mongoose.connect('mongodb+srv://pandawsh:Wshjy31928!@cluster0-v6n3j.mongodb.net/test',{
				 useNewUrlParser: true,
				 useCreateIndex: true
				 }).then(() => {
	console.log('Connected to DB!');
}).catch(err => {
	console.log('ERROR:', err.message);
});
// ***************************************