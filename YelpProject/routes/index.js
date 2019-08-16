var express = require("express");
var router = express.Router(); //then change all "app" into "router"
var passport = require("passport");
var User = require("../models/user");
// =============
// ROOT ROUTE
// =============
router.get("/", (req, res) => {
	res.render("landing"); //landing page, ejs file
});

// ==========
// AUTH ROUTE
// ==========
router.get("/register", (req, res)=> {
	res.render("register");
});

router.post("/register", (req, res) => {
	var newUser = new User({username: req.body.username});//username
	User.register(newUser, req.body.password, (err, user) => {
		if(err) {
			console.log(err);
			return res.render("register"); //to get out of the err context
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/foods");
		});	
	});//"register" provided by passport local mongoose
	
});

// show register form
router.get("/login", (req, res) => {
	res.render("login");
});

// login route
router.post("/login",passport.authenticate("local", {
	successRedirect: "/foods",
	failureRedirect:"/login"
	}), (req, res) => {
	res.send("LOGIN LOGIC");
});

router.get("/logout", (req, res) => {
	req.logout();
	res.redirect('/foods');
});

// only allow the user to comment when logged in
function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
}


module.exports = router;