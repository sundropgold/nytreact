/*
	================== Article Model ==================
*/

// require mongoose
var mongoose = require("mongoose");

// create Schema class
var Schema = mongoose.Schema;

// create Article schema
var ArticleSchema = new Schema({
	title:{
		// Article's title
		type:String,
		required:true,
		unique:true
	},
	date:{
		// Article's published date and time
		type:Date
	},
	url:{
		// Article's URL on nytimes
		type:String,
		required:true
	}
});

// create the Article model with the ArticleSchema
var Article = mongoose.model("Article", ArticleSchema);

// export the Article model
module.exports = Article;