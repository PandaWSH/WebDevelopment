var express = require("express"),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require("body-parser"),
	Food = require("./models/food"),
	Comment = require("./models/comment"),
	seedDB = require("./seeds"); 

seedDB();
mongoose.connect("mongodb://localhost/yelp_food",{useNewUrlParser:true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");

// SCHEMA SETUP

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
			res.render("foods/index",{foods: allFoods}); //send to the foods.ejs
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
	res.render("foods/new.ejs");	
});	 
	 //SHOW - shows more infor about one food post
app.get("/foods/:id", (req, res) => {
	Food.findById(req.params.id).populate("comments").exec((err, foundFood) => {
		if(err){
			console.log(err);
		} else{
			console.log(foundFood);
			res.render("foods/show", {food:foundFood}); 
		}			  
	});
});

// =============== 
// COMMENT ROUTES
// ===============

app.get("/foods/:id/comments/new", (req, res)=> {
	Food.findById(req.params.id, (err, food)=> {
		if(err) {
		   console.log(err);
		   } else{
			   res.render("comments/new", {food:food});
		   }
		});
	});

app.post("/foods/:id/comments", (req, res) => {
	//lookup food using ID
	Food.findById(req.params.id, (err, foodfound) => {
		if(err) {
			console.log(err);
		} else {
			Comment.create(req.body.comment, (err, comment)=> {
				if(err){
				console.log(err);
				} else {
					foodfound.comments.push(comment);
					foodfound.save();
					res.redirect('/foods/' + foodfound._id);
				}	   
			});
		}
	});
	//create new comment
	//connect new comment to food
	//redirect to show page
});

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