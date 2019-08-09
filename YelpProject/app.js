var express = require("express");
var app = express();
const mongoose = require('mongoose');
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");

var foods = [
		{name: "Salmon", image:"https://natashaskitchen.com/wp-content/uploads/2018/05/Pan-Seared-Salmon-with-Lemon-Butter-Sauce-5.jpg"},
		{name:"Dumplings",image:"https://www.thespruceeats.com/thmb/aMte6tsT-uBbnCvQZi2XtjwAemU=/4000x3000/smart/filters:no_upscale()/korean-dumpling-mandoo-2118676_hero-01-779525b88e834969b81f9a824bc0bf9b.jpg"},
		{name:"Rice noodles", image:"https://www.halfbakedharvest.com/wp-content/uploads/2018/08/Saucy-Coconut-Summer-Curry-with-Rice-Noodles-and-Garden-Vegetables-1.jpg"},
		{name:"Instagram post 08-08-2019", image:"https://scontent-lga3-1.cdninstagram.com/vp/2ced365725ba76743814230a8f3667f1/5DEC5A7E/t51.2885-15/e35/s1080x1080/66650312_185456442471099_8203707413253605632_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com"},
		{name:"Instagram post 08-0702019", image:"https://scontent-lga3-1.cdninstagram.com/vp/78bb17d8a43a427b14b0b4c91026402d/5DCB9628/t51.2885-15/e35/s1080x1080/68898609_445498566047701_5997042091357307574_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com"},
	 	{name:"Instagram post xx-xx-xxxx", image:"https://scontent-lga3-1.cdninstagram.com/vp/cd42810f0e92044209e3b6686b33b6a3/5DEC9478/t51.2885-15/e35/s1080x1080/66270062_470478073787308_1887982875598276185_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com"},
	{name:"Instagram post 08-08-2019", image:"https://scontent-lga3-1.cdninstagram.com/vp/2ced365725ba76743814230a8f3667f1/5DEC5A7E/t51.2885-15/e35/s1080x1080/66650312_185456442471099_8203707413253605632_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com"},
		{name:"Instagram post 08-0702019", image:"https://scontent-lga3-1.cdninstagram.com/vp/78bb17d8a43a427b14b0b4c91026402d/5DCB9628/t51.2885-15/e35/s1080x1080/68898609_445498566047701_5997042091357307574_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com"},
	{name:"Dumplings",image:"https://www.thespruceeats.com/thmb/aMte6tsT-uBbnCvQZi2XtjwAemU=/4000x3000/smart/filters:no_upscale()/korean-dumpling-mandoo-2118676_hero-01-779525b88e834969b81f9a824bc0bf9b.jpg"},
		{name:"Rice noodles", image:"https://www.halfbakedharvest.com/wp-content/uploads/2018/08/Saucy-Coconut-Summer-Curry-with-Rice-Noodles-and-Garden-Vegetables-1.jpg"}
	]
	
app.get("/", (req, res) => {
	res.render("landing"); //landing page, ejs file
});
// *******************************Group 1*********************************
app.get("/foods", (req, res) => {
	//temporally moved the var foods to the top as a universal variable	
	res.render("foods",{foods:foods});
});

app.post("/foods", (req, res) => {
	// get data from form and add to foods array	
	var name = req.body.name;
	var image = req.body.image;
	var newFood = {name: name, image: image}; //the object to be pushed.
	foods.push(newFood); //it has to be an object to be pushed.
	res.redirect("/foods"); //default as get request
	//redirect to the food page
});
// *******************************Group 1*********************************

// *******************************Group 2*********************************
app.get("/foods/new", (req, res)=> {
	res.render("new.ejs");	
});
// *******************************Group 1*********************************









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