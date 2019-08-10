var express = require("express"),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require("body-parser")

mongoose.connect("mongodb://localhost/yelp_food",{useNewUrlParser:true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");

// SCHEMA SETUP
var foodsSchema = new mongoose.Schema({
	name: String,
	image: String
});

var Food = mongoose.model("Food", foodsSchema); //created a model
	
app.get("/", (req, res) => {
	res.render("landing"); //landing page, ejs file
});

// *******************************Group 1*********************************
app.get("/foods", (req, res) => {
	// get all foods from db datasbase
	Food.find({}, (err, allFoods) => { 
		if(err){
			console.log(err);
		} else{
			res.render("foods",{foods: allFoods}); //send to the foods.ejs
		}
	});
});

app.post("/foods", (req, res) => {
	// get data from form and add to foods array	
	var name = req.body.name;
	var image = req.body.image;
	var newFood = {name: name, image: image}; //the object to be pushed.
	//create a new food and save to databases
	Food.create(newFood, (err, newlyCreated) => {
		if(err){
			console.log(err);
		} else{
			res.redirect("/foods"); 
		}
	});
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

// mongoose.connect('mongodb+srv://pandawsh:Wshjy31928!@cluster0-v6n3j.mongodb.net/test',{
// 				 useNewUrlParser: true,
// 				 useCreateIndex: true
// 				 }).then(() => {
// 	console.log('Connected to DB!');
// }).catch(err => {
// 	console.log('ERROR:', err.message);
// });
// ***************************************