var express = require("express");
var router = express.Router(); //then change all "app" into "router"
var Food = require("../models/food");
var Comment = require("../models/comment");
var middleware = require("../middleware/index.js"); //middleware file
//comments new
router.get("/foods/:id/comments/new", middleware.isLoggedIn, (req, res)=> { //isLoggedIn makes sure this will work only when user logged in 
	Food.findById(req.params.id, (err, food)=> {
		if(err) {
		   console.log(err);
		   } else{
			   res.render("comments/new", {food:food});
		   }
		});
	});

router.post("/foods/:id/comments", middleware.isLoggedIn,(req, res) => { //isLoggedIn makes sure comments will be seen only when users logged in
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
					req.flash("success","COMMENT HAS BEEN MADE");
					res.redirect('/foods/');
				}	   
			});
		}
	});
	//create new comment
	//connect new comment to food
	//redirect to show page
});

//COMMENT EDIT ROUTE
router.get("/foods/:id/comments/:comment_id/edit", middleware.checkCommentOwnership, (req, res)=> {
	Comment.findById(req.params.comment_id, (err, foundComment)=> {
		if(err) {
		   res.redirect("back");
		   } else {
		   res.render("comments/edit", {food_id: req.params.id, comment:foundComment});
		   }
	});	
});

// COMMENT UPDATE
router.put("/foods/:id/comments/:comment_id", middleware.checkCommentOwnership, (req, res)=> {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment)=> {
		if(err) {
			res.redirect("back");	
		} else {
			res.redirect("/foods");
		}
	});
});

// COMMENT DESTROY
router.delete("/foods/:id/comments/:comment_id", middleware.checkCommentOwnership, (req, res)=> {
	Comment.findByIdAndRemove(req.params.comment_id, (err)=> {
		if(err) {
			res.redirect("back");	
		} else {
			res.redirect("/foods");
		}
	});
});

// middleware all goes to a separate file


module.exports = router;