var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app",{useNewUrlParser:true});

var catSchema = new mongoose.Schema({
	name: String,
	age: Number,
	temperament: String
});

var Cat = mongoose.model("Cat", catSchema); //compile the variable to a model

Cat.creat()
// Cat.find({}, function(err, cats){
// 	if(err){
// 		console.log("OH NO");
// 		console.log(err);
// 	} else{
// 		console.log("all the cats");
// 		console.log(cats);
		
// 	}
// });
// var george = new Cat({
// 	name: "Mrs.Norris",
// 	age: 11,
// 	temperament:"Evil"
// });

// george.save(function(err, cat){
// 	if(err){
// 		console.log("SOMETHING WENT WRONG");
// 		console.log(cat);
// 	}
// });