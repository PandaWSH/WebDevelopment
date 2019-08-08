var express = require("express");
var app = express();
const mongoose = require('mongoose');

app.set("view engine","ejs");

app.get("/", (req, res) => {
	res.render("landing"); //landing page, ejs file
});

app.get("/campgrounds", (req, res) => {
	var campgrounds = [
		{name: "Salmon", image:"https://natashaskitchen.com/wp-content/uploads/2018/05/Pan-Seared-Salmon-with-Lemon-Butter-Sauce-5.jpg"},
		{name:"Dumplings",image:"https://www.thespruceeats.com/thmb/aMte6tsT-uBbnCvQZi2XtjwAemU=/4000x3000/smart/filters:no_upscale()/korean-dumpling-mandoo-2118676_hero-01-779525b88e834969b81f9a824bc0bf9b.jpg"},
		{name:"Rice noodles", image:"https://www.halfbakedharvest.com/wp-content/uploads/2018/08/Saucy-Coconut-Summer-Curry-with-Rice-Noodles-and-Garden-Vegetables-1.jpg"}
	]
	
	res.render("campgrounds",{campgrounds:campgrounds});
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