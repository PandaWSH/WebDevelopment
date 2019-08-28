var express = require("express"),
    app = express(),
	passport = require("passport"),
	LocalStrategy = require("passport-local"),
	methodOverride = require("method-override"), 
    mongoose = require('mongoose'),
    bodyParser = require("body-parser"),
	Food = require("./models/food"),
	User = require("./models/user"),
	Comment = require("./models/comment"),
	flash = require("connect-flash");
	//seedDB = require("./seeds"); 

require('dotenv').config();

var commentRoutes = require("./routes/comments"),
	foodRoutes = require("./routes/foods"),
	indexRoutes = require("./routes/index");

mongoose.connect("mongodb://localhost/yelp_food_final",{useNewUrlParser:true});
//mongoose.connect(process.env.DATABASEURL,{useNewUrlParser:true});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public")) //dirname makes sure the directory is current
app.use(methodOverride("_method"));
app.use(flash());
//seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "Eat too many noodles would gain me weight!",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); //authenticate came from LocalMongoose package
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next(); //move to next middle where
});

app.use(indexRoutes);
app.use(foodRoutes);
app.use(commentRoutes);

// ******************************* ROUTES *********************************

// ==============
// INDEX ROUTE - show all foods
// ==============

// =============== 
// COMMENT ROUTES
// ===============

// ==========
// AUTH ROUTE
// ==========

//*********** server setup **************
app.listen(9000, () => {
	console.log("server test ok!");
});

//app.listen(process.env.PORT, process.env.IP);
// ***************************************