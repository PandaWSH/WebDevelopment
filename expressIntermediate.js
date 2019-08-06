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

