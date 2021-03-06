var mongoose = require("mongoose");

var foodsSchema = new mongoose.Schema({
	name: String,
	// price: String,
	kind: String,
	image: String,
	imageId: String,
	ingredient: String,
	location: String,
	description: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	comments:[
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
});

module.exports = mongoose.model("Food", foodsSchema); //created a model