var mongoose = require("mongoose");
var passportLocalMongoose  = require("passport-local-mongoose");

// Add user model for authentication
var UserSchema = new mongoose.Schema({
	username: String,
	email:String,
	password: String
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);

