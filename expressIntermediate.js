var express = require("express"); //express package
var app = express();
const mongoose = require('mongoose');//mongoose conenction

app.get("/", function(req, res){
	res.render("home.ejs"); //ejs is the embedded java script, dynamic
});

app.get("/fallinlovewith/:thing",function(req, res){
	var thing = req.params.thing;
	res.render("love.ejs", {thingVar: thing});//in the {}, it's defining thingVar as thing
});

app.get("/posts", function(req,res){
	var posts= [
		{title: "Post1", author: "A"},
		{title: "Post2", author: "B"},
		{title: "Post3", author: "C"}
	];
	res.render("posts.ejs", {postVar: posts});
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

