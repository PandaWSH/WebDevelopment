var mongoose = require("mongoose"),
	express= require("express"),
	app = express(),
	bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost/restful_blog2",{useNewUrlParser:true});
app.use(bodyParser.urlencoded({extended: true}));

// POST - title, content
var postSchema = new mongoose.Schema({
	title: String,
	content: String
}); 
var Post = mongoose.model("Post", postSchema);

// USER - email, name
var userSchema = new mongoose.Schema({
	email: String,
	name: String,
	posts: [postSchema] //to link the user with post
});
var User = mongoose.model("User", userSchema);

User.findOne({name:"Ron Wesley"}, (err, user) => {
	if(err) {
		console.log(err);
	} else {
		user.posts.push({
			title: "something i do not like",
			content: "not allowing me to study"
	});
		user.save((err, user) => {
			if(err){
				console.log(err);
			} else {
				console.log(user);
			}
		});
	}
});

// // add new user together with some post
// var newUser = new User({  //create new user
// 	email: "Ron@hogwarts.edu",
// 	name :"Ron Wesley"
// });

// newUser.posts.push({
// 	title: "how to bre polyjuice potions",
// 	content: "just tsomeothing"
// });


// newUser.save((err, user) => {
// 	if(err){
// 		console.log(err);
// 	} else {
// 		console.log(user);
// 	}
// });

// var newPost = new Post({  //similarly, create new post
// 	title: "Sunday 08-11",
// 	content :"I'm working in the lab right now"
// });
// newPost.save((err, post) => {
// 	if(err){
// 		console.log(err);
// 	} else {
// 		console.log(post);
// 	}
// });

// // ****************************************** set up ***************************************
app.listen(9000, () => {
	console.log("server test ok!");
});
 