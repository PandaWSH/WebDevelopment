var express = require("express"); //express package
var app = express();
const mongoose = require('mongoose');//mongoose conenction

app.use(express.static("public")); //locate the css folder
app.set("view engine", "ejs"); //set the res.render file type, then no need to type .ejs everytime

app.get("/", function(req, res){
	res.render("home"); //ejs is the embedded java script, dynamic
});

app.get("/fallinlovewith/:thing",function(req, res){
	var thing = req.params.thing;
	res.render("love", {thingVar: thing});//in the {}, it's defining thingVar as thing
});

app.get("/posts", function(req,res){
	var posts= [
		{title: "Post1", author: "A"},
		{title: "Post2", author: "B"},
		{title: "Post3", author: "C"}
	];
	res.render("posts", {postVar: posts});
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

