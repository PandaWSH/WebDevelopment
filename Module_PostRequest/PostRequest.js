var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const mongoose = require('mongoose');//mongoose conenction



app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true})); 
var friends = ["Tony", "Peter", "Ron", "Daniel"];
app.get("/", (req, res) => {
	res.render("homepage");
});

 // take the data from input
app.post("/addfriend", (req, res) => {
	var newFriend = req.body.newfriend; //newfriend from the ejs file content name = "newfriend" 
	friends.push(newFriend);
	res.redirect("/friends"); //go back the freinds page
});

app.get("/friends", (req, res) => {
	res.render("friends", {friends:friends});
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