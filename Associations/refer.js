var mongoose = require("mongoose"),
	express= require("express"),
	app = express(),
	bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost/restful_blog3",{useNewUrlParser:true});
app.use(bodyParser.urlencoded({extended: true}));


//clean up the code and save models into file
// POST - title, content
var Post = require("./models/post");

// USER - email, name
var User = require("./models/user");

// User.create({
// 	email: "Alibaba@gmail.com",
// 	name:"asdhkjfaueorfhkvjbsdnd"
// });

// Post.create({
// 	title: "how to make it work?",
// 	content:"blah blah blah"
// }, (err, post) => {
// 	User.findOne({email: "bobo@gmail.com"}, (err, foundUser) => {
// 		if(err){
// 			console.log(err);
// 		} else {
// 			foundUser.posts.push(post);
// 			foundUser.save((err, data) => {
// 				if(err) {
// 				console.log(err);
// 				} else {
// 					console.log(post);
// 				}		   
// 		   });
// 		}
// 	});	
// });

//find user and find all posts for that user
User.findOne({email:"bobo@gmail.com"}).populate("posts").exec((err, user) => {
	if (err) {
		console.log(err);
	} else {
		console.log(user);
	}
});



// // ****************************************** set up ***************************************
app.listen(9000, () => {
	console.log("server test ok!");
});
 