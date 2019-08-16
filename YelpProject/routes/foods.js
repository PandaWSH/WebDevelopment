var express = require("express");
var router = express.Router(); //then change all "app" into "router"
var Food = require("../models/food");
router.get("/foods", (req, res) => {
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
router.post("/foods", isLoggedIn, (req, res) => {
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
router.get("/foods/new", isLoggedIn, (req, res)=> {
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

// EDIT FOOD ROUTE 
router.get("/foods/:id/edit", checkFoodOwnership, (req, res)=> {
	// check if user logged in:
		// does user own the campground:
			//if so, allow it to edit,
			//otherwise, redirect
	// if not logged in, redirect somewhere else
	Food.findById(req.params.id, (err, foundFood)=> {
		res.render("foods/edit", {food:foundFood});
		});	
});

//UPDATE FOOD ROUTE
router.put("/foods/:id", checkFoodOwnership, (req, res) => {
	//find and update the correct food
	Food.findByIdAndUpdate(req.params.id, req.body.food, (err, updatedFood)=> {
		if(err) {
			res.redirect("/foods");
		} else {
			res.redirect("/foods/" + req.params.id);  
		}
	});
	//redirect somewhere
});

// DESTROY ROUTE
router.delete("/foods/:id", checkFoodOwnership, (req, res)=> {
	Food.findByIdAndRemove(req.params.id, (err)=> {
		if(err){ 
			res.redirect("/foods");
		} else {
			res.redirect("/foods");
		}
	});
});

// middleware -- only allow the user to comment when logged in
function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
}

function checkFoodOwnership(req, res, next) {
	if(req.isAuthenticated()){
		Food.findById(req.params.id, (err, foundFood)=> {
		if(err) {
			res.redirect("back");
		} else {
			//check if the user own the campground 
			if(foundFood.author.id.equals(req.user._id)){//foundFood.author.id is not a string but a mongoose object
				next(); //more generalized version
			} else {
				res.redirect("back");
			}	
		}
		});	
	} else {
		res.redirect("back"); //thatk the user to where they came from before
	}		
}


module.exports = router;