var express = require("express");
var router = express.Router(); //then change all "app" into "router"
var Food = require("../models/food");
router.get("/foods", isLoggedIn, (req, res) => {
	// get all foods from db datasbase
	Food.find({}, (err, allFoods) => { 
		if(err){
			console.log(err);
		} else{
			res.render("foods/index",{foods: allFoods, currentUser: req.user}); //send to the foods.ejs
		}
	});
});

	//CREATE - add new foods to DB
router.post("/foods", (req, res) => {
	// get data from form and add to foods array	
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username //req.user reflects current loggd in user
	}
	var newFood = {name: name, image: image, description: description, author:author}; //the object to be pushed.
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
router.get("/foods/new", (req, res)=> {
	res.render("foods/new.ejs");	
});	 
	 //SHOW - shows more infor about one food post
router.get("/foods/:id", (req, res) => {
	Food.findById(req.params.id).populate("comments").exec((err, foundFood) => {
		if(err){
			console.log(err);
		} else{
			console.log(foundFood);
			res.render("foods/show", {food:foundFood}); 
		}			  
	});
});

// only allow the user to comment when logged in
function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
}


module.exports = router;