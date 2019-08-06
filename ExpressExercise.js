var express = require("express"); //express package
var app = express();
const mongoose = require('mongoose');//mongoose conenction

//first route
app.get("/", function(req,res){
	res.send("Hi There, welcome to my assignment!");	
});

//second route
app.get("/speak/:animal", function(req,res){
	var sounds = {
		pig: "Oink",
		cow: "Moo",
		dog: "Woof Woof!",
		cat: "I'm proud of being a cat!"
	};
	//work as a diction
	var animal = req.params.animal;
	var sound = sounds[animal];
	res.send("The " + animal +" says " + sound);//important route pattern	
});

//third route
app.get("/repeat/:message/:time", function(req,res){
	var message = req.params.message;
	var time = Number(req.params.time);
	var result = " ";
	
	for (var i = 0; i< time; i++){
		result += message + " ";
	}
	res.send(result);
});

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

