var express = require("express");
var router = express.Router(); //then change all "app" into "router"
var Food = require("../models/food");
var middleware = require("../middleware"); //since the folder only has one file, it's ok this way
// ---------------------- image upload ------------------------
var multer = require('multer');
var storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter})
var toShow = false;



const cloudinary = require('cloudinary');  
cloudinary.config({ 
  cloud_name: 'pandapandawsh', 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});
// ------------------------------------------------------------

// INDEX - get all foods from db datasbase
router.get("/foods", (req, res) => {
	if(req.query.search) {
		const regex = new RegExp(escapeRegex(req.query.search),'gi');
		Food.find({name: regex}, (err, allFoods) => { //only search regex in names
			if(err){
				console.log(err);
			} else {
				res.render("foods/index",{foods: allFoods, currentUser: req.user}); //send to the foods.ejs
			}
		}); 
	} else {	
		Food.find({}, (err, allFoods) => { 
			if(err){
				console.log(err);
			} else{
				res.render("foods/index",{foods: allFoods, currentUser: req.user}); //send to the foods.ejs
			}
		});
	}	
});

//CREATE - add new foods to DB
router.post("/foods", middleware.isLoggedIn, upload.single('image'), (req, res) => {
	cloudinary.v2.uploader.upload(req.file.path, function(err, result) {
		if(err) {
			req.flash('error',err.message);
			return res.redirect('back');
		}
		// add cloudinary url for the image to the food object under image property
		req.body.food.image = result.secure_url;
		// add image's public url for the image to the food object under image property
		req.body.food.imageId = result.public_id;
		// add author to campground
		req.body.food.author = {
		id: req.user._id,
		username: req.user.username
		}
		Food.create(req.body.food, function(err, food) {
		if (err) {
		  req.flash('error', err.message);
		  return res.redirect('back');
		}
		res.redirect('/foods');
  });
});
	
});

//NEW - show form to create new
router.get("/foods/new", middleware.isLoggedIn, (req, res)=> {
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
router.get("/foods/:id/edit", middleware.checkFoodOwnership, (req, res)=> {
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
router.put("/foods/:id", upload.single('image'),middleware.checkFoodOwnership, (req, res) => {
	//find and update the correct food
	Food.findById(req.params.id, async (err, food)=> {
		if(err) {
			req.flash("error",err.message);
			res.redirect("/foods");
		} else {
			if(req.file) {
				try {
					await cloudinary.v2.uploader.destroy(food.imageId);
					var result = await cloudinary.v2.uploader.upload(req.file.path);	
					food.imageId = result.public_id;
					food.image = result.secure_url;
				} catch(err) {
					req.flash("error",err.message);
					return res.redirect("/foods");
				}
			}
			food.name = req.body.food.name; //no need to chekc with if condition, becuase it would always be there
			food.description = req.body.food.description;
			food.save();
			req.flash("success", "Successfully Updated!");
			res.redirect("/foods/" + req.params.id);  
		}
	});
	//redirect somewhere
});

// DESTROY ROUTE
router.delete("/foods/:id", middleware.checkFoodOwnership, (req, res)=> {
	Food.findById(req.params.id, async (err, food)=> {
		if(err){ 
			req.flash("error",err.message);
			res.redirect("/foods");
		} try {
			await cloudinary.v2.uploader.destroy(food.imageId); //waiting for the image to be destroyed
			food.remove();
			req.flash("sucess",'This cuisine has been deleted'); 
			return res.redirect("/foods");
		} catch(err) {
			if(err){ 
			req.flash("error",err.message);
			res.redirect("/foods");
			}
		}
	});
});

// middleware all goes to a separate file

function escapeRegex(text) {
	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&");
}; 

module.exports = router;