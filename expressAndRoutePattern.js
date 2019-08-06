var express = require("express");
const mongoose = require('mongoose');
var app = express();

//first route
app.get("/", function(req,res){
	res.send("Hi There");	
});

app.get("/bye", function(req,res){
	res.send("Byebye");	
});

app.get("/r/:subName", function(req,res){
	res.send("Welcome to a sublist section");//important route pattern	
});

app.get("/r/:subName/comment/:id/:title/", function(req,res){
	res.send("Welcome to a sublist section");//important route pattern
});


app.get("*", function(req,res){
	res.send("YOU ARE A STAR");	//some random character that's not in the choise
});

app.get("/dog", function(req,res){
	res.send("dog dog dog");	
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

