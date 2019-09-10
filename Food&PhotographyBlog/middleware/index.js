// all the middleware goes here
var Food = require("../models/food");
var Comment = require("../models/comment");
var middlewareObj = {};

middlewareObj.checkFoodOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		Food.findById(req.params.id, (err, foundFood)=> {
		if(err) {
			res.redirect("back");
		} else {
			//check if the user own the campground 
			if(foundFood.author.id.equals(req.user._id)){//foundFood.author.id is not a string but a mongoose object
				next(); //more generalized version
			} else {
				req.flash("error", "YOU DON'T HAVE PERMISSION TO DO THAT");
				res.redirect("back");
			}	
		}
		});	
	} else {
		req.flash("error", "YOU NEED TO BE LOGGED IN TO DO THAT");
		res.redirect("back"); //thatk the user to where they came from before
	}		
}

middlewareObj.checkCommentOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, (err, foundComment)=> {
		if(err) {
			res.redirect("back");
		} else {
			//check if the user own the campground 
			if(foundComment.author.id.equals(req.user._id)){//foundComment.author.id is not a string but a mongoose object
				next(); //more generalized version
			} else {
				req.flash("error","YOU DON'T HAVE PERMISSION TO DO THAT");
				res.redirect("back");
			}	
		}
		});	
	} else {
		res.redirect("back"); //thatk the user to where they came from before
	}		
}

middlewareObj.isLoggedIn = function(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	req.flash("error", "Please Login First!"); //error's content "Please..." corespondes to "error" in app.js
	res.redirect("/login");
}

 module.exports = middlewareObj;

