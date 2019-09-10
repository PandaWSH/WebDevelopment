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
	var newUser = new User({username: req.body.username, email:req.body.email});//username
	User.register(newUser, req.body.password,(err, user) => {
		if(err) {
			req.flash("error",err.message); //err.message will show the message
			res.render("register"); //to get out of the err context	
		}
		passport.authenticate("local")(req, res, function(){
			req.flash("success",  + "Hi! " + req.body.username +", thank you and welcome to Panda's Album!");
			res.redirect("/foods");
		});	
	});//"register" provided by passport local mongoose
	
});

// show login form
router.get("/login", (req, res) => {
	res.render("login",{referer:req.headers.referer});
});

// login route
router.post("/login", passport.authenticate("local", {failureRedirect: "/login",failureFlash: true}), (req, res) => {
    if (req.headers.referer && (req.body.referer !== undefined && req.body.referer.slice(-6) !== "/login")) {
		req.flash("success","WELCOME BACK");
        res.redirect(req.body.referer);
    } else {
        res.redirect("/foods");
    }
});

router.get("/logout", (req, res) => {
	req.logout();
	req.flash("success","SEE YOU LATER!");
	res.redirect("back");
});

// only allow the user to comment when logged in
function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	req.flash("error","PLEASE LOG IN TO DO THAT");
	res.redirect("/login");
}


module.exports = router;