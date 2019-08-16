var express = require("express");
var router = express.Router(); //then change all "app" into "router"
var Food = require("../models/food");
var Comment = require("../models/comment");

//comments new
router.get("/foods/:id/comments/new", isLoggedIn, (req, res)=> { //isLoggedIn makes sure this will work only when user logged in 
	Food.findById(req.params.id, (err, food)=> {
		if(err) {
		   console.log(err);
		   } else{
			   res.render("comments/new", {food:food});
		   }
		});
	});

router.post("/foods/:id/comments", isLoggedIn, (req, res) => { //isLoggedIn makes sure comments will be seen only when users logged in
	//lookup food using ID
	Food.findById(req.params.id, (err, foodfound) => {
		if(err) {
			console.log(err);
		} else {
			Comment.create(req.body.comment, (err, comment)=> {
				if(err){
				console.log(err);
				} else {
					//add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					// save comment
					comment.save();
					foodfound.comments.push(comment);
					foodfound.save();
					console.log(comment);
					res.redirect('/foods/' + foodfound._id);
				}	   
			});
		}
	});
	//create new comment
	//connect new comment to food
	//redirect to show page
});

//COMMENT EDIT ROUTE
router.get("/foods/:id/comments/:comment_id/edit", checkCommentOwnership, (req, res)=> {
	Comment.findById(req.params.comment_id, (err, foundComment)=> {
		if(err) {
		   res.redirect("back");
		   } else {
		   res.render("comments/edit", {food_id: req.params.id, comment:foundComment});
		   }
	});	
});

// COMMENT UPDATE
router.put("/foods/:id/comments/:comment_id", checkCommentOwnership, (req, res)=> {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment)=> {
		if(err) {
			res.redirect("back");	
		} else {
			res.redirect("/foods/" + req.params.id);
		}
	});
});

// COMMENT DESTROY
router.delete("/foods/:id/comments/:comment_id", checkCommentOwnership, (req, res)=> {
	Comment.findByIdAndRemove(req.params.comment_id, (err)=> {
		if(err) {
			res.redirect("back");	
		} else {
			res.redirect("/foods/" + req.params.id);
		}
	});
});

// middleware
function checkCommentOwnership(req, res, next) {
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, (err, foundComment)=> {
		if(err) {
			res.redirect("back");
		} else {
			//check if the user own the campground 
			if(foundComment.author.id.equals(req.user._id)){//foundComment.author.id is not a string but a mongoose object
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


// only allow the user to comment when logged in
function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
}


module.exports = router;