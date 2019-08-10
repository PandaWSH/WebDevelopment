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
	image: String,
	description: String 
});

var Food = mongoose.model("Food", foodsSchema); //created a model

// Food.create(
// 	{
// 		name:"My cuisine",
// 		image:"https://scontent-lga3-1.cdninstagram.com/vp/2ced365725ba76743814230a8f3667f1/5DEC5A7E/t51.2885-15/e35/s1080x1080/66650312_185456442471099_8203707413253605632_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com",
// 		description:"My Instagram post 08-08-2019"
// 	},
// 	(err, food) => {
// 	if(err){
// 	console.log(err)
// } else{
// 	console.log("NEWLY CREATED FOOD");
// 	console.log(food);
// }
// 	});

app.get("/", (req, res) => {
	res.render("landing"); //landing page, ejs file
});

// *******************************Group 1*********************************
	//INDEX route - show all foods
app.get("/foods", (req, res) => {
	// get all foods from db datasbase
	Food.find({}, (err, allFoods) => { 
		if(err){
			console.log(err);
		} else{
			res.render("index",{foods: allFoods}); //send to the foods.ejs
		}
	});
});

	//CREATE - add new foods to DB
app.post("/foods", (req, res) => {
	// get data from form and add to foods array	
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var newFood = {name: name, image: image, description: description}; //the object to be pushed.
	//create a new food and save to databases
	Food.create(newFood, (err, newlyCreated) => {
		if(err){
			console.log(err);
		} else{
			res.redirect("/foods"); 
		}
	});
});

	//NEW - show form to create new
 app.get("/foods/new", (req, res)=> {
	res.render("new.ejs");	
});	 
	 //SHOW - shows more infor about one food post
app.get("/foods/:id", (req, res) => {
	Food.findById(req.params.id, (err, foundFood) => {
		if(err){
			console.log(err);
		} else{
			res.render("show", {food:foundFood}); 
		}			  
	});
});

// *******************************Group 1********************************


//*********** server setup **************
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