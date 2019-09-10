var mongoose = require("mongoose");
var Food = require("./models/food");
var Comment = require("./models/comment");

var data = [{
	name:"pic 1",
	image:"https://www.halfbakedharvest.com/wp-content/uploads/2018/08/Saucy-Coconut-Summer-Curry-with-Rice-Noodles-and-Garden-Vegetables-1.jpg",
	description:"This is picture 1"
},
	{name:"pic 2",
	image:"https://www.thespruceeats.com/thmb/aMte6tsT-uBbnCvQZi2XtjwAemU=/4000x3000/smart/filters:no_upscale()/korean-dumpling-mandoo-2118676_hero-01-779525b88e834969b81f9a824bc0bf9b.jpg",
	description:"This is picture 2"},
	{name:"pic 3",
	image:"https://natashaskitchen.com/wp-content/uploads/2018/05/Pan-Seared-Salmon-with-Lemon-Butter-Sauce-5.jpg",
	description:"This is picture 3"
	}];

function seedDB(){
	// remove all foods
		Food.remove({},(err)=>{
		console.log("remove foods");
		// then loop through the data to add new [in the same call-back function]
		data.forEach(function(seed){
			Food.create(seed, (err,fooddata) => {
				if(err) {
					console.log(err);
				} else {
					console.log("added a food to the list");
					//create a comment
					Comment.create({
						text:"this food is good but to spicy",
						author:"panda"},
						(err, comment)=> {
						if(err) {
							console.log(err);
						} else {
						//associate with data
						fooddata.comments.push(comment);
						fooddata.save();
						console.log("Created new comment");
						}
					});
				}
			});
		});
	});
}

module.exports = seedDB;