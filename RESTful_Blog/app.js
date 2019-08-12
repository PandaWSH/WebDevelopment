var express = require("express"),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	methodOverride = require("method-override"),
	app = express();


mongoose.connect("mongodb://localhost/restful_blog",{useNewUrlParser:true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));

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

// EDIT ROUTE
app.get("/blogs/:id/edit", (req, res) =>{
	Blog.findById(req.params.id, (err, foundBlog) =>{
		if(err){
			res.redirect("blogs");
		} else{
			res.render("edit", {blog: foundBlog});
		}
	});
});

// UPDATE ROUTE (after editing, it needs to be updated)
app.put("/blogs/:id", (req, res) => {
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) => {
		if(err){
			res.send("There's error");
		} else {
			res.redirect("/blogs/" + req.params.id);
		}
	});
});

// DELETE ROUTE
app.delete("/blogs/:id", (req, res) => {
	Blog.findByIdAndRemove(req.params.id, (err) => {
	 if(err){
		 res.redirect("/blogs");
	 } else {
		 res.redirect("/blogs");
	 }
	});
});

// ****************************************** set up ***************************************
app.listen(9000, () => {
	console.log("server test ok!");
});
 
