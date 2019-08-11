var express = require("express"),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	app = express();

mongoose.connect("mongodb://localhost/restful_blog",{useNewUrlParser:true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static("public"));

var blogSchema = new mongoose.Schema({
	title: String,
    image: String,
    body: String,
    created: {type: Date, default:Date.now}
});

var Blog = mongoose.model("Blog",blogSchema);

app.get("/", (req, res) => {
	res.redirect("/blogs");
});

// INDEX ROUTE
app.get("/blogs", (req, res) => {
	Blog.find({}, (err, blogs) => {
		if(err){
			console.log("ERROR!");
		}else{
			res.render("index", {blogs: blogs});
		}
	});
});

// NEW ROUTE
app.get("/blogs/new", (req, res) => {
	res.render("new");
});

// CREATE ROUTE
app.post("/blogs", (req, res) => {
	Blog.create(req.body.blog, (err, newBlog) => {	
	if(err){
		res.render("new");
	} else {
		res.redirect("/blogs");
		}
	}); 
});

// SHOW ROUTE
app.get("/blogs/:id", (req, res) =>{
	Blog.findById(req.params.id, (err, foundBlog) => {
		if(err){
			res.redirect("/blogs");
		}else{
			res.render("show", {blog:foundBlog});
		}	
	});
}); 

app.listen(9000, () => {
	console.log("server test ok!");
});
 
